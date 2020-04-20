export interface Rules {
  [index: string]: boolean;
  preventSameHousehold: boolean;
}

export interface Person {
  name: string;
  household: string;
}

export interface Match {
  giver: Person;
  receiver: Person;
}

export interface RulesProps {
  rules: Rules;
  toggleRule: (name: string) => void;
}

export interface RuleToggleProps {
  display: string;
  index: string;
  toggled: boolean;
  toggle: (name: string) => void;
}

export interface PeopleProps {
  people: Person[];
  addPerson: (person: Person) => void;
  removePerson: (name: string) => void;
  resetPeople: () => void;
}

export interface MatchesProps {
  matches: Match[];
  areMatchesGenerating: boolean;
  areMatchesValid: boolean;
  // matchesMessage: string;
  regenerateMatches: () => void;
}

export interface TransitionProps {
  show: boolean;
  enter: string;
  enterFrom: string;
  enterTo: string;
  leave: string;
  leaveFrom: string;
  leaveTo: string;
  children: any;
}
