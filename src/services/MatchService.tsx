export interface temp {}

// import Participant from "../interfaces/Participant";
// import Match from "../interfaces/Match";
// import Rules from "../interfaces/Rules";
// import Gender from "../interfaces/Gender";

// export default class MatchService {
//   async generateMatches(participants: Participant[], rules: Rules): Promise<Match[]> {
//     if (!rules.allowSameHousehold && !rules.allowSameAgeGroup && !rules.allowSameGender && !rules.allowCircularGifting && !rules.enforcePreviousYearsRule) {
//       return this.simpleMatch(participants);
//     } else {
//       return this.complexMatch(participants, rules);
//     }
//   }

//   private simpleMatch(participants: Participant[]): Match[] {
//     let matches: Match[] = [];
//     let potentialReceivers = [...participants];

//     for (let i = 0; i < participants.length; i++) {
//       let receiverIndex = this.randomIndex(potentialReceivers.length);

//       while (receiverIndex === i) {
//         receiverIndex = this.randomIndex(potentialReceivers.length);
//       }

//       matches.push({ giver: participants[i], receiver: potentialReceivers[receiverIndex]});
//       potentialReceivers.splice(receiverIndex, 1);
//     }

//     return matches;
//   }

//   private complexMatch(participants: Participant[], rules: Rules): Match[] {
//     let matches: Match[] = [];
//     let potentialReceivers = [...participants];

//     for (let i = 0; i < participants.length; i++) {
//       let disallowedIndexes: number[] = [];
//       disallowedIndexes.push(i);

//       let receiverIndex = this.randomIndex(potentialReceivers.length, disallowedIndexes);

//       if (rules.allowSameHousehold) {
//         while (participants[i].household === potentialReceivers[receiverIndex].household && disallowedIndexes.length < potentialReceivers.length) {
//           disallowedIndexes.push(receiverIndex);
//           receiverIndex = this.randomIndex(potentialReceivers.length, disallowedIndexes);
//         }
//       }

//       if (rules.allowSameAgeGroup) {
//         //enforce age group rule here
//       }

//       if (rules.allowSameGender) {
//         // if (participants[i].gender !== Gender.other) {
//         //   while (participants[i].gender === potentialReceivers[receiverIndex].gender && disallowedIndexes.length < potentialReceivers.length) {
//         //     disallowedIndexes.push(receiverIndex);
//         //     receiverIndex = this.randomIndex(potentialReceivers.length, disallowedIndexes);
//         //   }
//         // }
//       }

//       if (rules.allowCircularGifting) {
//         const existingReceiverMatch = matches.find(match => match.giver === potentialReceivers[receiverIndex]);

//         if (existingReceiverMatch !== undefined && existingReceiverMatch.receiver === participants[i] && disallowedIndexes.length < potentialReceivers.length) {
//           disallowedIndexes.push(receiverIndex);
//           receiverIndex = this.randomIndex(potentialReceivers.length, disallowedIndexes);
//         }
//       }

//       if (rules.enforcePreviousYearsRule) {
//         //enforce previous years rule here
//       }

//       if (disallowedIndexes.length > potentialReceivers.length) {
//         console.log("Match is impossible with supplied rules");
//         return [];
//       }

//       matches.push({ giver: participants[i], receiver: potentialReceivers[receiverIndex]});
//       potentialReceivers.splice(receiverIndex, 1);
//     }

//     return matches;
//   }

//   private randomIndex(length: number, disallowedIndexes?: number[]): number {
//     length = Math.ceil(length);
//     let random = Math.floor(Math.random() * length);

//     if (disallowedIndexes !== undefined) {
//       while (disallowedIndexes.includes(random)) {
//         random = Math.floor(Math.random() * length)
//       }
//     }

//     return random;
//   }
// }