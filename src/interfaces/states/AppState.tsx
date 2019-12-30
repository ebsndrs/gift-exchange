import { Participant } from "../Participant";
import { Match } from "../Match";
import { PreviousYear } from "../PreviousYear";

export interface AppState {
  participants: Participant[];
  households: string[];
  matches: Match[];
  previousYears: PreviousYear[];
  isAgeGroupRuleActive: boolean;
  isGenderRuleActive: boolean;
  isHouseholdRuleActive: boolean;
  isPreviousYearsRuleActive: boolean;
  previousYearsToMatchAgainst: number;
}