import { Participant } from "../interfaces/Participant";
import { Match } from "../interfaces/Match";

export default class MatchService {
  generateMatches(participants: Participant[]): Match[] {
    let matches = this.generateMatchesWithNoRules(participants);

    return matches;
  }

  private generateMatchesWithNoRules(participants: Participant[]): Match[] {
    let matches: Match[] = [];
    let alreadyReceivedIndexes: number[] = [];

    for (let i = 0; i < participants.length; i++) {
      let giverIndex = i;
      let receiverIndex = this.randomInteger(0, participants.length - 1);

      while (receiverIndex === giverIndex || alreadyReceivedIndexes.includes(receiverIndex)) {
        receiverIndex = this.randomInteger(0, participants.length - 1);
      }

      let match: Match = {
        giver: participants[giverIndex],
        receiver: participants[receiverIndex]
      };

      matches.push(match);
      alreadyReceivedIndexes.push(receiverIndex);
    }

    return matches;
  }

  private randomInteger(min: number, max: number): number {
      min = Math.floor(0);
      max = Math.ceil(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}