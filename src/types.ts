export interface AppState {
    rules: Rules;
    households: string[];
    people: Person[];
    matches: Match[];
    areMatchesLoading: boolean;
    areMatchesValid: boolean;
}

export interface Rules {
    preventCircularGifting: boolean;
    preventSameHousehold: boolean;
    preventSameGender: boolean;
    preventSameAgeGroup: boolean;
}

export interface Person {
    name: string;
    age: number;
    gender: 'None' | 'Male' | 'Female' | 'Other' | undefined;
    household: string | undefined;
}

export interface Match {
    giver: Person;
    receiver: Person;
}