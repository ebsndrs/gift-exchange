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

      let receiverHasGiven = receiverIndex < giverIndex;
      let receiversGivingMatch = matches.find(m => m.giver.name === participants[receiverIndex].name);
      let givingToEachOther = receiverHasGiven && receiversGivingMatch?.giver.name === participants[giverIndex].name;

      while (receiverIndex === giverIndex || alreadyReceivedIndexes.includes(receiverIndex) || givingToEachOther) {
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