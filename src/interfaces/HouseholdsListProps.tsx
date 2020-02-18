export default interface HouseholdsListProps {
  households: string[];
  addHousehold: (household: string) => void;
  removeHousehold: (household: string) => void;
}