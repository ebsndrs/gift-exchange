import Person from "./Person";
import Rules from "./Rules";
import Match from "./Match";

export default interface AppState {
  rules: Rules;
  people: Person[];
  households: string[];
  matches: Match[];
}