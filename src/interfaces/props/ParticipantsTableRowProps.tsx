import { Participant } from "../models/Participant";

export interface ParticipantsTableRowProps {
  index: number;
  households: string[];
  genders: string[];
  participant: Participant;
  handleNameChange: (index: number, newName: string) => void;
  handleHouseholdChange: (index: number, newHousehold: string) => void;
}