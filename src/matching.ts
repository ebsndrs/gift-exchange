import { Person, Match, Rules } from './types';

export function generatePermutation(people: Person[], permutation: number) {
  let peopleCopy = [...people]; // copy of the set
  let length = people.length; // length of the set
  let result; // return value, undefined
  let index: number;
  let factorial: number;

  // compute f = factorial(len)
  for (factorial = index = 1; index <= length; index++) {
    factorial *= index;
  }

  // if the permutation number is within range
  if (permutation >= 0 && permutation < factorial) {
    // start with the empty set, loop for length elements
    for (result = []; length > 0; length--) {
      // determine the next element:
      // there are factorial/length subsets for each possible element,
      factorial /= length;
      // a simple division gives the leading element index
      index = Math.floor(permutation / factorial);
      // alternately: index = (permutation - permutation % factorial) / f;
      result.push(peopleCopy.splice(index, 1)[0]);
      // reduce permutation for the remaining subset:
      // compute the remainder of the above division
      permutation %= factorial;
      // extract the index-th element from peopleCopy and push it at the end of result
    }
  }
  // return the permutated set or undefined if n is out of range
  return result;
}

export default class MatchHelper {
  genders: string[];

  constructor(genders: string[]) {
    this.genders = genders;
  }

  generateMatches(
    people: Person[] | undefined,
    adjacencyMatrix: number[][]
  ): Match[] {
    let matches: Match[] = [];

    if (people === undefined) {
      return matches;
    }

    //iterate through the givers to assign each one a match
    for (let i = 0; i < people.length; i++) {
      const giver = people[i];

      for (let j = 0; j < people.length; j++) {
        const receiver = people[j];

        if (adjacencyMatrix[i][j] > 0 && adjacencyMatrix[j][i] > 0) {
          matches.push({ giver: giver, receiver: receiver });
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
      const lastGiver = people[people.length - 1];
      const lastReceiver = people[0];

      matches.push({ giver: lastGiver, receiver: lastReceiver });
    }

    return matches;
  }

  areMatchesValid(
    peopleLength: number,
    matches: Match[],
    households: string[],
    rules: Rules
  ): boolean {
    let areMatchesValid = true;

    //matches length must be equal to people length
    if (matches.length !== peopleLength) {
      areMatchesValid = false;
    } else {
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];

        //one cannot give to themself
        if (match.giver.name === match.receiver.name) {
          areMatchesValid = false;
          break;
        }

        //if there's more than one of the same giver, it's invalid
        if (
          matches.filter((m) => m.giver.name === match.giver.name).length > 1
        ) {
          areMatchesValid = false;
          break;
        }

        //if there's more than one of the same receiver, it's invalid
        if (
          matches.filter((m) => m.receiver.name === match.receiver.name)
            .length > 1
        ) {
          areMatchesValid = false;
          break;
        }

        if (rules.preventCircularGifting) {
          //logic
          // if ()
        }

        if (rules.preventSameHousehold) {
          if (
            match.giver.household !== households[0] ||
            match.receiver.household !== households[0]
          ) {
            if (match.giver.household === match.receiver.household) {
              areMatchesValid = false;
              break;
            }
          }
        }

        if (rules.preventSameGender) {
          if (
            match.giver.gender !== this.genders[0] ||
            match.receiver.gender !== this.genders[0]
          ) {
            if (match.giver.gender === match.receiver.gender) {
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

  buildAdjacencyMatrix(
    people: Person[] | undefined,
    households: string[],
    rules: Rules
  ): number[][] {
    let matrix: number[][] = [];

    if (people === undefined) {
      return matrix;
    }

    //build out the empty matrix
    for (let i = 0; i < people.length; i++) {
      matrix.push([]);
      for (let j = 0; j < people.length; j++) {
        matrix[i].push(0);
      }
    }

    //iterate through the givers one by one
    for (let i = 0; i < people.length; i++) {
      const giver = people[i];

      //now iterate through potential receivers and determine if they can match
      for (let j = 0; j < people.length; j++) {
        const receiver = people[j];
        let isMatchGood = true;

        //people can't give to themselves
        if (giver.name === receiver.name) {
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
          if (
            giver.household !== households[0] ||
            receiver.household !== households[0]
          ) {
            if (giver.household === receiver.household) {
              isMatchGood = false;
            }
          }
        }

        //if the rules prevent the same gender, match on that only if both households are not the default
        if (rules.preventSameGender) {
          if (
            giver.gender !== this.genders[0] ||
            receiver.gender !== this.genders[0]
          ) {
            if (giver.gender === receiver.gender) {
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
      [shuffledPeople[i], shuffledPeople[j]] = [
        shuffledPeople[j],
        shuffledPeople[i],
      ];
    }

    return shuffledPeople;
  }

  // A DFS based recursive function that returns true if a match for the supplied vertex is possible
  bipartiteMatching(
    giverCount: number,
    receiverCount: number,
    bpGraph: number[][],
    vertex: number,
    seen: boolean[],
    matchR: number[]
  ): boolean {
    //try every giver one by one
    for (let v = 0; v < receiverCount; v++) {
      if (bpGraph[vertex][v] > 0 && !seen[v]) {
        seen[v] = true;

        if (
          matchR[v] < 0 ||
          this.bipartiteMatching(
            giverCount,
            receiverCount,
            bpGraph,
            matchR[v],
            seen,
            matchR
          )
        ) {
          matchR[v] = vertex;
          return true;
        }
      }
    }

    return false;
  }

  //returns maximum number of matches from M to N
  maximumBipartiteMatching(
    bpGraph: number[][],
    giverCount: number,
    receiverCount: number
  ) {
    let matchR = Array(receiverCount);

    for (let i = 0; i < receiverCount; ++i) {
      matchR[i] = -1;
    }

    let result = 0;
    for (let u = 0; u < giverCount; u++) {
      let seen: boolean[] = Array(receiverCount);
      for (let i = 0; i < receiverCount; ++i) {
        seen[i] = false;
      }

      if (
        this.bipartiteMatching(
          giverCount,
          receiverCount,
          bpGraph,
          u,
          seen,
          matchR
        )
      ) {
        result++;
      }
    }

    return result;
  }
}
