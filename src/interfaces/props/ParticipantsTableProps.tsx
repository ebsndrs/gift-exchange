import { Participant } from "../models/Participant";

export interface ParticipantsTableProps {
  households: string[];
  participants: Participant[];
  addParticipant: (participant: Participant) => void;
  handleParticipantNameChange: (index: number, newName: string) => void;
  handleParticipantHouseholdChange: (index: number, newHousehold: string) => void;
}