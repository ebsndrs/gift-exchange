import { Participant } from "../Participant";
import { Match } from "../Match";
import { PreviousYear } from "../PreviousYear";
import { Rules } from "../Rules";

export interface AppState {
  participants: Participant[];
  households: string[];
  matches: Match[];
  previousYears: PreviousYear[];
  rules: Rules;
}