import { Person, Match, Rules, Factorial } from './types';

/*
  Contains all calculated (n!) for n <= 18.
  I included this so that I didn't have to calculate it over and over again.
  n = 18 is the limit because 19! is greater than the maximum possible integer value in JavaScript.
  To access the value, just use factorial[n].
*/
export const nFactorial: number[] = [
  1, //n = 0
  1, //n = 1
  2, //n = 2
  6, //n = 3
  24, //n = 4
  120, //n = 5
  720, //n = 6
  5040, //n = 7
  40320, //n = 8
  362880, //n = 9
  3628800, //n = 10
  39916800, //n = 11
  479001600, //n = 12
  6227020800, //n = 13
  87178291200, //n = 14
  1307674368000, //n = 15
  20922789888000, //n = 16
  355687428096000, //n = 17,
  6402373705728000, //n = 18
];

/*
  Contains all calculated (n! / n) for n <= 18.
  I included this so that I didn't have to calculate it over and over again.
  n = 18 is the limit because 19! is greater than the maximum possible integer value in JavaScript.
  To access the value, just use factorial[n].
*/
export const nFactorialDivN: number[] = [
  0, //n = 0 (0! = 1. 1 / 0 is NaN, but for our purposes we can say 0)
  0, //n = 1
  1, //n = 2
  2, //n = 3
  6, //n = 4
  24, //n = 5
  120, //n = 6
  720, //n = 7
  5040, //n = 8
  40320, //n = 9
  362880, //n = 10
  3628800, //n = 11
  39916800, //n = 12
  479001600, //n = 13
  6227020800, //n = 14
  87178291200, //n = 15
  1307674368000, //n = 16
  20922789888000, //n = 17
  355687428096000, //n = 18
];

/*
  Gets the specific permutation "n" of the array "people".
  Specifically, the order of permutations as defined in Heap's Algorithm.
*/
export function getPermutation(people: Person[], n: number) {
  let peopleCopy = [...people]; // copy of the set
  let length = people.length; // length of the set
  let result: Person[] = []; // return value, empty set
  let factorial: number = nFactorial[length]; //possible permutations

  // if the permutation number is within range
  if (n >= 0 && n < factorial) {
    // start with the empty set, loop for length elements
    for (result = []; length > 0; length--) {
      // determine the next element:
      // there are factorial/length subsets for each possible element,
      factorial = nFactorialDivN[length];
      // a simple division gives the leading element index
      let index = Math.floor(n / factorial);

      result.push(peopleCopy.splice(index, 1)[0]);
      // reduce permutation for the remaining subset:
      // compute the remainder of the above division
      n %= factorial;
      // extract the index-th element from peopleCopy and push it at the end of result
    }
  }
  // return the permutated set or empty set if permutation is out of range
  return result;
}

/*
  Gets all matches for an array of people.
  Specifically, it generates a specific permutation (n) of an array of people.
  With that permutation and the rules defined by the front-end, it generates an adjacency matrix.
  This matrix determines which matches *can* allowed.

  Using this matrix, it determines whether or not a fully matched set can be made.
  If certain rules prevent a full match set from being made,
  this function will return an empty set to signify that a match was impossible with the supplied inputs.

  If a fully matched set can be made, it generates the bipartite matching set and returns it.
*/
export function getMatches(
  people: Person[],
  n: number,
  households: string[],
  rules: Rules
): Match[] {
  //get n permutation of people
  const permutation = getPermutation(people, n);

  //build adjacency matrix with that permuation, households, rules
  const matrix = buildAdjacencyMatrix(permutation, households, rules);

  //calculate the max matches
  const maxMatches = maximumBipartiteMatching(
    matrix,
    people.length,
    people.length
  );

  let matches: Match[] = [];

  //if max matches is equal to the length of people:
  if (maxMatches === people.length) {
    matches = generateMatches(permutation, matrix, n);
    matches.sort((first, second) =>
      first.giver.name.localeCompare(second.giver.name)
    );
  }

  return matches;
  //generate matches
  //sort them by the same order that people were originally in
  //return it
  //else
  //return empty [] (this means matches couldn't be generated)
}

export function buildAdjacencyMatrix(
  people: Person[],
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
      // if (rules.preventSameGender) {
      //   if (
      //     giver.gender !== this.genders[0] ||
      //     receiver.gender !== this.genders[0]
      //   ) {
      //     if (giver.gender === receiver.gender) {
      //       isMatchGood = false;
      //     }
      //   }
      // }

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

export function maximumBipartiteMatching(
  adjacencyMatrix: number[][],
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
      bipartiteMatching(
        giverCount,
        receiverCount,
        adjacencyMatrix,
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

// A DFS based recursive function that returns true if a match for the supplied vertex is possible
export function bipartiteMatching(
  giverCount: number,
  receiverCount: number,
  adjacencyMatrix: number[][],
  vertex: number,
  seen: boolean[],
  matchR: number[]
): boolean {
  //try every giver one by one
  for (let v = 0; v < receiverCount; v++) {
    if (adjacencyMatrix[vertex][v] > 0 && !seen[v]) {
      seen[v] = true;

      if (
        matchR[v] < 0 ||
        bipartiteMatching(
          giverCount,
          receiverCount,
          adjacencyMatrix,
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

export function generateMatches(
  people: Person[],
  adjacencyMatrix: number[][],
  p: number
): Match[] {
  let matches: Match[] = [];

  //iterate through the givers to assign each one a match
  for (let i = 0; i < people.length; i++) {
    const giver = people[i];

    for (let j = 0; j < people.length; j++) {
      const receiver = people[j];

      if (adjacencyMatrix[i][j] > 0 && adjacencyMatrix[j][i] > 0) {
        matches.push({ giver: giver, receiver: receiver, p: p });
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

    matches.push({ giver: lastGiver, receiver: lastReceiver, p: p });
  }

  return matches;
}

// export default class MatchHelper {
//   genders: string[];

//   constructor(genders: string[]) {
//     this.genders = genders;
//   }

//   areMatchesValid(
//     peopleLength: number,
//     matches: Match[],
//     households: string[],
//     rules: Rules
//   ): boolean {
//     let areMatchesValid = true;

//     //matches length must be equal to people length
//     if (matches.length !== peopleLength) {
//       areMatchesValid = false;
//     } else {
//       for (let i = 0; i < matches.length; i++) {
//         const match = matches[i];

//         //one cannot give to themself
//         if (match.giver.name === match.receiver.name) {
//           areMatchesValid = false;
//           break;
//         }

//         //if there's more than one of the same giver, it's invalid
//         if (
//           matches.filter((m) => m.giver.name === match.giver.name).length > 1
//         ) {
//           areMatchesValid = false;
//           break;
//         }

//         //if there's more than one of the same receiver, it's invalid
//         if (
//           matches.filter((m) => m.receiver.name === match.receiver.name)
//             .length > 1
//         ) {
//           areMatchesValid = false;
//           break;
//         }

//         if (rules.preventCircularGifting) {
//           //logic
//           // if ()
//         }

//         if (rules.preventSameHousehold) {
//           if (
//             match.giver.household !== households[0] ||
//             match.receiver.household !== households[0]
//           ) {
//             if (match.giver.household === match.receiver.household) {
//               areMatchesValid = false;
//               break;
//             }
//           }
//         }

//         if (rules.preventSameGender) {
//           if (
//             match.giver.gender !== this.genders[0] ||
//             match.receiver.gender !== this.genders[0]
//           ) {
//             if (match.giver.gender === match.receiver.gender) {
//               areMatchesValid = false;
//               break;
//             }
//           }
//         }

//         if (rules.preventSameAgeGroup) {
//           //logic
//         }
//       }
//     }

//     return areMatchesValid;
//   }

//   shufflePeople(people: Person[]): Person[] {
//     let shuffledPeople = [...people];

//     for (let i = shuffledPeople.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffledPeople[i], shuffledPeople[j]] = [
//         shuffledPeople[j],
//         shuffledPeople[i],
//       ];
//     }

//     return shuffledPeople;
//   }

//   /

//   //returns maximum number of matches from M to N

// }
