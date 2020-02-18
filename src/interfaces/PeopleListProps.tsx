import Person from "./Person";

export default interface PeopleListProps {
  people: Person[],
  households: string[],
  genders: string[],
  addPerson: (person: Person) => void,
  removePerson: (name: string) => void
}