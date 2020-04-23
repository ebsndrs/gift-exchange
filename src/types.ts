export interface StateCache {
  people: Person[];
  matches: Match[];
  rules: Rules;
  matchPermutation: number;
  areMatchesValid: boolean;
  invalidMatchesError: string;
}

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
  editPerson: (string: string, newPerson: Person) => void;
  removePerson: (name: string) => void;
  clearPeople: () => void;
}

export interface PeopleRowProps {
  people: Person[];
  households: string[];
  person: Person;
  isOtherEditFormActive: boolean;
  removePerson: (name: string) => void;
  editPerson: (name: string, newPerson: Person) => void;
  onIsEditFormToggled: (state: boolean) => void;
}

export interface MatchesProps {
  rules: Rules;
  matches: Match[];
  areMatchesLoading: boolean;
  areMatchesValid: boolean;
  errorKey: string;
  toggleRule: (name: string) => void;
  refreshMatches: () => void;
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
