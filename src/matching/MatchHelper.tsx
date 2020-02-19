import Person from "../interfaces/Person";
import Rules from "../interfaces/Rules";
import Match from "../interfaces/Match";

export default class MatchHelper {
  genders: string[];

  constructor(genders: string[]) {
    this.genders = genders;
  }

  generateMatches(people: Person[], adjacencyMatrix: number[][]): Match[] {
    let matches: Match[] = [];

    //iterate through the gifters to assign each one a match
    for (let i = 0; i < people.length; i++) {
      const gifter = people[i];

      for (let j = 0; j < people.length; j++) {
        const giftee = people[j];

        if (adjacencyMatrix[i][j] > 0 && adjacencyMatrix[j][i] > 0) {
          matches.push({ gifter: gifter, giftee: giftee });
          adjacencyMatrix[i][j] = 0;
          adjacencyMatrix[j][i] = 0;
          for (let k = 0; k < adjacencyMatrix[i].length; k++) {
            adjacencyMatrix[i][k] = 0;
            adjacencyMatrix[k][i] = 0;
          }
        }
      }
    }

    if (matches.length < people.length) {
      const lastGifter = people[people.length - 1];
      const lastGiftee = people[0];

      matches.push({ gifter: lastGifter, giftee: lastGiftee });
    }

    return matches;
  }

  areMatchesValid(peopleLength: number, matches: Match[], households: string[], rules: Rules): boolean {
    let areMatchesValid = true;

    //matches length must be equal to people length
    if (matches.length !== peopleLength) {
      areMatchesValid = false;
    } else {
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
  
        //one cannot give to themself
        if (match.gifter.name === match.giftee.name) {
          areMatchesValid = false;
          break;
        }
  
        //if there's more than one of the same gifter, it's invalid
        if (matches.filter(m => m.gifter.name === match.gifter.name).length > 1) {
          areMatchesValid = false;
          break;
        }
  
        //if there's more than one of the same giftee, it's invalid
        if (matches.filter(m => m.giftee.name === match.giftee.name).length > 1) {
          areMatchesValid = false;
          break;
        }
  
        if (rules.preventCircularGifting) {
          //logic
        }
  
        if (rules.preventSameHousehold) {
          if (match.gifter.household !== households[0] || match.giftee.household !== households[0]) {
            if (match.gifter.household === match.giftee.household) {
              areMatchesValid = false;
              break;
            }
          }
        }
  
        if (rules.preventSameGender) {
          if (match.gifter.gender !== this.genders[0] || match.giftee.gender !== this.genders[0]) {
            if (match.gifter.gender === match.giftee.gender) {
              areMatchesValid = false;
              break;
            }
          }
        }
  
        if (rules.preventSameAgeGroup) {
          //logic
        }
      }
    }

    return areMatchesValid;
  }

  buildAdjacencyMatrix(people: Person[], households: string[], rules: Rules): number[][] {
    let matrix: number[][] = [];

    //build out the empty matrix
    for (let i = 0; i < people.length; i++) {
      matrix.push([]);
      for (let j = 0; j < people.length; j++) {
        matrix[i].push(0);
      }
    }

    //iterate through the gifters one by one
    for (let i = 0; i < people.length; i++) {
      const gifter = people[i];

      //now iterate through potential giftees and determine if they can match
      for (let j = 0; j < people.length; j++) {
        const giftee = people[j];
        let isMatchGood = true;

        //people can't give to themselves
        if (gifter.name === giftee.name) {
          isMatchGood = false;
        }

        //if the rules prevent circular gifting, account for that
        if (rules.preventCircularGifting) {
          //not sure how this will be implemented. We can't know if circular giving has occured until
          //after the matrix has been generated. So that means we need to check it after that.
          //Perhaps when we  check for circular giving, we add any matches that are circular to an array,
          //call the function recursively but with those disallowed matches, and use that to winnow the field.
        }

        //if the rules prevent the same household, match on that only if both households are not the default
        if (rules.preventSameHousehold) {
          if (gifter.household !== households[0] || giftee.household !== households[0]) {
            if (gifter.household === giftee.household) {
              isMatchGood = false;
            }
          }
        }

        //if the rules prevent the same gender, match on that only if both households are not the default
        if (rules.preventSameGender) {
          if (gifter.gender !== this.genders[0] || giftee.gender !== this.genders[0]) {
            if (gifter.gender === giftee.gender) {
              isMatchGood = false;
            }
          }
        }

        //if the rules prevent the same age group, match on that only if both ages are not the default
        if (rules.preventSameAgeGroup) {
          //age group logic
        }

        if (isMatchGood) {
          matrix[i][j]++;
          matrix[j][i]++;
        }
      }
    }

    return matrix;
  }

  shufflePeople(people: Person[]): Person[] {
    let shuffledPeople = [...people];

    for (let i = shuffledPeople.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledPeople[i], shuffledPeople[j]] = [shuffledPeople[j], shuffledPeople[i]];
    }

    return shuffledPeople;
  }

  // A DFS based recursive function that returns true if a match for the supplied vertex is possible
  bipartiteMatching(gifterCount: number, gifteeCount: number, bpGraph: number[][], vertex: number, seen: boolean[], matchR: number[]): boolean {
    //try every giver one by one
    for (let v = 0; v < gifteeCount; v++) {
      if (bpGraph[vertex][v] > 0 && !seen[v]) {
        seen[v] = true;

        if (matchR[v] < 0 || this.bipartiteMatching(gifterCount, gifteeCount, bpGraph, matchR[v], seen, matchR)) {
          matchR[v] = vertex;
          return true;
        }
      }
    }

    return false;
  }

  //returns maximum number of matches from M to N
  maximumBipartiteMatching(bpGraph: number[][], gifterCount: number, gifteeCount: number) {
    let matchR = Array(gifteeCount);

    for (let i = 0; i < gifteeCount; ++i) {
      matchR[i] = -1;
    }

    let result = 0;
    for (let u = 0; u < gifterCount; u++) {
      let seen: boolean[] = Array(gifteeCount);
      for (let i = 0; i < gifteeCount; ++i) {
        seen[i] = false;
      }

      if (this.bipartiteMatching(gifterCount, gifteeCount, bpGraph, u, seen, matchR)) {
        result++;
      }
    }

    return result;
  }
}