export interface Rules {
    enforceAgeGroupRule: boolean;
    enforceGenderRule: boolean;
    enforceHouseholdRule: boolean;
    enforceCircularGiftingRule: boolean;
    enforcePreviousYearsRule: boolean;
    previousYearsToEnforce: number;
}