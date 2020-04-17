//models
export interface Rules {
  preventCircularGifting: boolean;
  preventSameHousehold: boolean;
  preventSameGender: boolean;
  preventSameAgeGroup: boolean;
}

export interface Person {
  name: string;
  age: number;
  gender: 'None' | 'Male' | 'Female' | 'Other';
  household: string | undefined;
}

export interface Match {
  giver: Person;
  receiver: Person;
}

//props
export interface RulesProps {
  rules: Rules;
  changeRule: (name: string, value: boolean) => void;
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
  matches: Match[];
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
