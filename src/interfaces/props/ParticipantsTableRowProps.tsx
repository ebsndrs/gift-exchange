import { Participant } from "../models/Participant";
import { Gender } from "../models/Gender";

export interface ParticipantsTableRowProps {
  index: number;
  households: string[];
  genders: string[];
  participant: Participant;
  handleNameChange: (index: number, newName: string) => void;
  handleHouseholdChange: (index: number, newHousehold: string) => void;
  handleGenderChange: (index: number, newGender: Gender) => void;
}