import { Participant } from "../models/Participant";
import { Gender } from "../models/Gender";

export interface ParticipantsTableProps {
  households: string[];
  participants: Participant[];
  addParticipant: (participant: Participant) => void;
  handleParticipantNameChange: (index: number, newName: string) => void;
  handleParticipantHouseholdChange: (index: number, newHousehold: string) => void;
  handleParticipantGenderChange: (index:  number, newGender: Gender) => void;
}