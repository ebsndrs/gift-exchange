import Match from "./Match";

export default interface MatchesListProps {
  matches: Match[];
  areMatchesGenerating: boolean;
  areMatchesValid: boolean;
  matchesMessage: string;
}