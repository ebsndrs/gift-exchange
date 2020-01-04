import { Participant } from "../models/Participant";

export interface ParticipantsTableRowProps {
  households: string[];
  genders: string[];
  participant: Participant;
}