import Rules from "./Rules";

export default interface RulesListProps {
  rules: Rules;
  changeRule: (name: string, value: boolean) => void;
}