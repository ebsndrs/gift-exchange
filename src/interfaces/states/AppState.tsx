import { Participant } from "../models/Participant";
import { Match } from "../models/Match";
import { PreviousYear } from "../models/PreviousYear";
import { Rules } from "../models/Rules";

export interface AppState {
  participants: Participant[];
  households: string[];
  matches: Match[];
  previousYears: PreviousYear[];
  rules: Rules;
}