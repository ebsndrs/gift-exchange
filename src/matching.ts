import { Person, Match, Rules } from './types';

/*
  Gets a random integer that is not the prohibited number
*/
export function getRandomFromZero(max: number, prohibitedNumbers: number[]) {
  max = Math.floor(max);
  let result: number;

  do {
    result = Math.floor(Math.random() * max);
  } while (prohibitedNumbers.includes(result));

  return result;
}

export function checkIfMatchingIsPossible(
  people: Person[],
  households: string[],
  rules: Rules
): boolean {
  const matrix = getAdjacencyMatrix(people, households, rules);

  const maximumMatches = getMaximumBipartiteMatching(
    matrix,
    people.length,
    people.length
  );

  return maximumMatches > 0;
}

/*
  Gets the possible number of permutations of a collection of size n
  Returns the maximum JavaScript integer value if n! is greater than 18
  This is because 19! is higher than the maximum JavaScript integer
*/
export function factorializeN(n: number): number {
  if (n < 0) {
    return -1;
  } else if (n === 0) {
    return 1;
  } else {
    return n * factorializeN(n - 1);
  }
}

/*
  Checks if two supplied match arrays are identical
*/
export function checkIfMatchesAreIdentical(first: Match[], second: Match[]) {
  if (first.length !== second.length) {
    return false;
  }

  first.sort((a, b) => a.giver.name.localeCompare(b.giver.name));
  second.sort((a, b) => a.giver.name.localeCompare(b.giver.name));

  for (let i = 0; i < first.length; i++) {
    if (first[i].receiver.name !== second[i].receiver.name) {
      return false;
    }
  }

  return true;
}

/*
  Gets a match set from an array of people.
  Specifically, it generates a specific permutation (n) of an array of people.
  With that permutation and the rules defined by the front-end, it generates an adjacency matrix.
  This matrix determines which matches *can* allowed.

  Using this matrix, it determines whether or not a fully matched set can be made.
  If certain rules prevent a full match set from being made,
  this function will return an empty set to signify that a match was impossible with the supplied inputs.
  In this case, the caller will likely try a different permutation until a match is found.

  If a fully matched set can be made, it generates the bipartite matching set and returns it.
*/
export function getMatch(n: number, people: Person[], rules: Rules): Match[] {
  //get n permutation of people
  const permutation = getPermutation(n, people);

  const households = [...new Set(people.map((person) => person.household))];

  //build adjacency matrix with that permutation, households, rules
  const matrix = getAdjacencyMatrix(permutation, households, rules);

  const maxMatches = getMaximumBipartiteMatching(
    matrix,
    people.length,
    people.length
  );

  let matches: Match[] = [];

  if (maxMatches > 0) {
    matches = generateMatch(permutation, matrix);
  }

  return matches;
}

/*
  Builds the match set from a given permutation of people and adjacency matrix

  Essentially, it takes each person in the permutation, uses the adjacency matrix
  to identify the next person in the permutation that is matchable, and creates the link

  It then resets every entry in the matrix for both of those people to 0, to show that they
  are now unavailable for matching
*/
function generateMatch(people: Person[], adjacencyMatrix: number[][]): Match[] {
  let matches: Match[] = [];

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

export function validateMatches(
  matches: Match[],
  expectedLength: number,
  households: string[],
  rules: Rules
): boolean {
  let areMatchesValid = true;

  //matches length must be equal to people length
  if (matches.length !== expectedLength) {
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
      if (matches.filter((m) => m.giver.name === match.giver.name).length > 1) {
        areMatchesValid = false;
        break;
      }

      //if there's more than one of the same receiver, it's invalid
      if (
        matches.filter((m) => m.receiver.name === match.receiver.name).length >
        1
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
        if (match.giver.gender !== 'None' || match.receiver.gender !== 'None') {
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

/*
  Gets the specific permutation "n" of the array "people".
  Specifically, the order of permutations as defined in Heap's Algorithm.
*/
function getPermutation(n: number, people: Person[]) {
  let peopleCopy = [...people]; // copy of the set
  let length = people.length; // length of the set
  let result: Person[] = []; // return value, empty set
  let factorial: number = factorializeN(length); //possible permutations

  // if the permutation number is within range
  if (n >= 0 && n < factorial) {
    // start with the empty set, loop for length elements
    for (result = []; length > 0; length--) {
      // determine the next element:
      // there are factorial/length subsets for each possible element,
      factorial /= length;
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
  Uses the supplied parameters to build an adjacency matrix that determines whether a match can be made.
  An adjacency matrix is a data structure that signals whether two objects in a graph are "adjacent",
  or linked by a vertex.
  In our use case, if two people are adjacent, they are able to be matched. In the simplest case (no rules),
  every object is adjacent to every object other than itself.
  The various rules that prevent certain matches can make two objects non-adjacent.

  In this implementation, our adjacency matrix is a two-dimensional array on integers.
  Each dimension is the same length as the original array.
  For every person, we check our rules against every person to determine
  if a match can be made. If it passes all the rules, the value of the cell in the matrix that represents
  the intersection of those two people is iterated.

  This generated matrix is then used to actually create the matches between people.
  */
export function getAdjacencyMatrix(
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
        //not sure how this will be implemented. We can't know if circular giving has occurred until
        //after the matrix has been generated. So that means we need to check it after that.
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

/*
  Determines the maximum number of matches than can be theoretically made
  for a supplied adjacency matrix.

  This is important because if an adjacency matrix was generated with rules
  that prevent a complete match set (for example, if 2 people in the same
  household were in the list, but the rules prevented same household giving),
  then this function show that a match set is impossible, so we don't go to the
  trouble of actually attempting to build the match set.
*/
export function getMaximumBipartiteMatching(
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
      getBipartiteMatching(
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

/*
  A DFS based recursive function that returns true only if a match for the supplied vertex is possible
  Used when calculating the number of potential matches.
*/
function getBipartiteMatching(
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
        getBipartiteMatching(
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
