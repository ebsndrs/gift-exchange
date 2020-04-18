//models
export interface Rules {
  [index: string]: boolean;
  preventCircularGifting: boolean;
  preventSameHousehold: boolean;
  preventSameGender: boolean;
  preventSameAgeGroup: boolean;
}

export interface Person {
  name: string;
  age: number;
  gender: string;
  household: string | undefined;
}

export interface Match {
  p: number;
  giver: Person;
  receiver: Person;
}

//props
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
  households: string[];
  genders: string[];
  addPerson: (person: Person) => void;
  removePerson: (name: string) => void;
  resetPeople: () => void;
}

export interface MatchesProps {
  matches: Match[][];
  areMatchesGenerating: boolean;
  areMatchesValid: boolean;
  // matchesMessage: string;
  regenerateMatches: () => void;
}

export interface HouseholdsProps {
  households: string[];
  addHousehold: (household: string) => void;
  removeHousehold: (household: string) => void;
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

export interface Factorial {
  [index: number]: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  11: number;
  12: number;
  13: number;
  14: number;
  15: number;
  16: number;
  17: number;
  18: number;
  19: number;
}
