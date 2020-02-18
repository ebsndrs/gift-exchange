export {}
// import Rules from "./interfaces/Rules";
// import Person from "./interfaces/Person";
// import Match from "./interfaces/Match";

// export default function GenerateMatches(rulesToMatchOn: Rules, peopleToMatch: Person[]): { items: Match[], error: boolean, message: string } {
//   const people = [...peopleToMatch];
//   const rules = {...rulesToMatchOn};

//   let result: { items: Match[], error: boolean, message: string } = {
//     items: [],
//     error: false,
//     message: ''
//   };
  
//   if (!rulesToMatchOn.preventCircularGifting && !rulesToMatchOn.preventSameHousehold && !rulesToMatchOn.preventSameGender && !rulesToMatchOn.preventSameAgeGroup) {
//     result = simpleMatch(rules, people);
//   }

//   return result;
//   // const canDoSimpleMatch = !rules.preventCircularGifting && !rules.preventSameHousehold && !rules.preventSameGender && !rules.preventSameAgeGroup;

//   // let result: { items: Match[], error: boolean, message: string } = {
//   //   items: [],
//   //   error: false,
//   //   message: ''
//   // };

//   // let receivers = [...people];
//   // let disallowedReceiverIndexes: number[] = [];

//   // //handle some simple cases with only 2 gifters first
//   // if (canDoSimpleMatch && people.length === 2) {
//   //   result.items.push({ giver: people[0], receiver: receivers[1] });
//   //   result.items.push({ giver: people[1], receiver: receivers[0] });
//   //   return result;
//   // } else if (rules.preventCircularGifting && people.length === 2 ) {
//   //   result.items = [];
//   //   result.error = true;
//   //   result.message = 'Preventing circular gifting doesn\'t work when there are only two people.'
//   //   return result;
//   // }

//   // let peopleMatchQualities: { person: Person, householdIsGood: boolean, genderIsGood: boolean }[] = [];

//   // for (let i = 0; i < people.length; i++) {
//   //   peopleMatchQualities.push({
//   //     person: people[i],
//   //     householdIsGood: true,
//   //     genderIsGood: true
//   //   });
//   // }

//   // //now loop through every person and identify a receiver.
//   // //if a receiver cannot be found, break the loop and return an error.
//   // for (let i = 0; i < peopleMatchQualities.length; i++) {
//   //   //You can't give to yourself, so start there.
//   //   let receiverIndex = getRandomIndex(receivers.length, [ i ]);
    
//   //   if (canDoSimpleMatch) {
//   //     result.items.push({ giver: peopleMatchQualities[i].person, receiver: receivers[receiverIndex!] });
//   //     disallowedReceiverIndexes.push(receiverIndex!);
//   //     receivers.splice(receiverIndex!, 1);
//   //   } else {
//   //     let receiverIsGood = true;

//   //     do {
//   //       if (rules.preventSameHousehold) {
//   //         if (peopleMatchQualities[i].person.household !== 'None' && receivers[receiverIndex!].household !== 'None') {
//   //           peopleMatchQualities[i].householdIsGood = peopleMatchQualities[i].person.household !== receivers[receiverIndex!].household;
//   //         }
//   //       }
//   //       if (rules.preventSameGender) {
//   //         if (peopleMatchQualities[i].person.gender !== 'None' && receivers[receiverIndex!].household !== 'None') {
//   //           peopleMatchQualities[i].genderIsGood = peopleMatchQualities[i].person.household !== receivers[receiverIndex!].household;
//   //         }
//   //       }
//   //       if (rules.preventSameAgeGroup) {
//   //         //age group logic here
//   //       }
  
//   //       if (peopleMatchQualities[i].householdIsGood && peopleMatchQualities[i].genderIsGood) {
//   //         result.items.push({ giver: people[i], receiver: receivers[receiverIndex!] });
//   //         receivers.splice(receiverIndex!, 1);
//   //         receiverIsGood = true;
//   //       } else {
//   //         disallowedReceiverIndexes.push(receiverIndex!);
//   //         receiverIndex = getRandomIndex(receivers.length, disallowedReceiverIndexes);

//   //         if (receiverIndex === undefined) {
//   //           result.items = [];
//   //           result.error = true;
//   //           result.message = 'Something went wrong';
//   //           return result;
//   //         }
//   //       }
//   //     } while (!receiverIsGood);

//       // //check for household rule
//       // if (rules.preventSameHousehold) {
//       //   let continueCheckingHouseholdRule = true;
//       //   while (continueCheckingHouseholdRule) {
//       //     receiverIndex = getRandomIndex(receivers.length, disallowedReceiverIndexes);
//       //     if (receiverIndex === undefined) {
//       //       result.items = [];
//       //       result.error = true;
//       //       result.message = 'Matching with the supplied households is impossible.';
//       //       continueCheckingHouseholdRule = false;
//       //     } else if ((people[i].household !== 'None' || receivers[receiverIndex].household !== 'None') && people[i].household === receivers[receiverIndex].household) {
//       //       disallowedReceiverIndexes.push(receiverIndex);
//       //     } else {
//       //       result.items.push({ giver: people[i], receiver: receivers[receiverIndex]});
//       //       receivers.splice(receiverIndex, 1);
//       //       continueCheckingHouseholdRule = false;
//       //     }
//       //   }

//       //   if (result.error) {
//       //     break;
//       //   }
//       // }
//       // //check for gender rule
//       // if (rules.preventSameGender) {

//       // }
//       // //check for age group rule
//       // if (rules.preventSameAgeGroup) {

//       // }
//   //   }
//   // }

//   // return result;
// }

// //   const randomIndex = (length: number, disallowedIndexes?: number[]): number | undefined => {
// //     length = Math.ceil(length);

// //     if (disallowedIndexes !== undefined && disallowedIndexes.length > 1 && disallowedIndexes.length === length) {
// //       return undefined;
// //     }

// //     let random = Math.floor(Math.random() * length);

// //     if (disallowedIndexes !== undefined) {
// //       while (disallowedIndexes.includes(random)) {
// //         random = Math.floor(Math.random() * length)
// //       }
// //     }

// //     return random;
// //   }

// //   const simpleMatch = (): Match[] => {
// //     let matches: Match[] = [];
// //     let potentialReceivers = [...people];

// //     for (let i = 0; i < people.length; i++) {
// //       let receiverIndex = randomIndex(potentialReceivers.length, [i]);

// //       matches.push({ giver: people[i], receiver: potentialReceivers[receiverIndex!] });
// //       potentialReceivers.splice(receiverIndex!, 1);
// //     }

// //     return matches;
// //   }

// //   const complexMatch = (): Match[] | undefined => {
// //     let matches: Match[] | undefined = [];
// //     let potentialReceivers = [...people];

// //     for (let i = 0; i < people.length; i++) {
// //       let disallowedIndexes = [i];
// //       let receiverIndex = randomIndex(potentialReceivers.length, disallowedIndexes);

// //       if (receiverIndex !== undefined) {
// //         if (rules.preventSameHousehold) {
// //           if (people[i].household !== 'None' || potentialReceivers[receiverIndex!].household !== 'None') {
// //             while (people[i].household === potentialReceivers[receiverIndex!].household) {
// //               disallowedIndexes.push(receiverIndex!);
// //               receiverIndex = randomIndex(potentialReceivers.length, disallowedIndexes);
// //               if (receiverIndex === undefined) {
// //                 matches = undefined;
// //                 break;
// //               } else {
// //                 matches!.push({ giver: people[i], receiver: potentialReceivers[receiverIndex!] });
// //                 potentialReceivers.splice(receiverIndex!, 1);
// //               }
// //             }
// //           }
// //         }
// //       } else {
// //         matches = undefined;
// //       }
// //     }

// //     return matches;
// //   }

// //   if (!rules.preventCircularGifting && !rules.preventSameHousehold && !rules.preventSameGender && !rules.preventSameAgeGroup) {
// //     return simpleMatch();
// //   }
// //   else {
// //     return complexMatch();
// //   }
// // }

// function simpleMatch(rules: Rules, people: Person[]): { items: Match[], error: boolean, message: string } {
//   let result: { items: Match[], error: boolean, message: string } = {
//     items: [],
//     error: false,
//     message: ''
//   };

//   if (people.length === 2) {
//     result.items.push({ gifter: people[0], receiver: people[1] });
//     result.items.push({ gifter: people[1], receiver: people[0] });
//     return result;
//   }

//   if (rules.preventCircularGifting && people.length === 2) {
//     result.error = true;
//     result.message = 'Cannot enable circular gifting for only two participants.';
//     return result;
//   }

//   let giftees = [...people];

//   for (let i = 0; i < people.length; i++) {
//     const gifter = people[i];

//     let gifteeIndex = Math.floor(Math.random() * Math.ceil(giftees.length))
//     let giftee = giftees[gifteeIndex];

//     while (giftee.name === gifter.name) {
//       gifteeIndex = Math.floor(Math.random() * Math.ceil(giftees.length));
//       giftee = giftees[gifteeIndex];
//     }

//     result.items.push({ gifter: {...gifter}, receiver: {...giftee} });
//     giftees.splice(gifteeIndex, 1);
//   }

//   return result;
// }

// // function getRandomIndex(length: number, disallowedIndexes?: number[]): number | undefined {
// //   length = Math.ceil(length);

// //   if (disallowedIndexes !== undefined && disallowedIndexes.length > 1 && disallowedIndexes.length === length) {
// //     return undefined;
// //   }

// //   let random = Math.floor(Math.random() * length);

// //   if (disallowedIndexes !== undefined) {
// //     while (disallowedIndexes.includes(random)) {
// //       random = Math.floor(Math.random() * length)
// //     }
// //   }

// //   return random;
// // }