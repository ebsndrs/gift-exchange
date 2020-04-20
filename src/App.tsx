import React, { useState, useEffect } from 'react';
import People from './components/People';
import Matches from './components/Matches';
import { default as RulesComponent } from './components/Rules';
import { Rules, Person, Match } from './types';
import {
  getMatch,
  getRandomFromZero,
  checkIfMatchingIsPossible,
  checkIfMatchesAreIdentical,
  factorializeN,
  validateMatches,
} from './matching';
import './tailwind.css';

export default function App() {
  const [people, setPeople] = useState<Person[]>([]);
  const [rules, setRules] = useState<Rules>({
    preventSameHousehold: false,
  });
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentMatchPermutation, setCurrentMatchPermutation] = useState(0);
  const [areMatchesLoading, setAreMatchesLoading] = useState(false);
  const [areMatchesValidState, setAreMatchesValidState] = useState(false);
  const [invalidMatchesError, setInvalidMatchesError] = useState('');

  const generateMatches = () => {
    setAreMatchesLoading(true);

    if (people.length < 2) {
      setMatches([]);
      setAreMatchesValidState(false);
      setInvalidMatchesError('LowerThanMinimum');
    } else if (people.length > 170) {
      setMatches([]);
      setAreMatchesValidState(false);
      setInvalidMatchesError('GreaterThanMaximum');
    } else if (checkIfMatchingIsPossible(people, rules)) {
      const maxPermutations = factorializeN(people.length);
      const households = [...new Set(people.map((person) => person.household))];
      let isValidMatch = false;
      let newMatches: Match[] = [];
      let random: number = 0;

      //brute force it until we find a valid match set
      //the more people, the less likely a collision will occur
      do {
        random = getRandomFromZero(maxPermutations, [currentMatchPermutation]);
        newMatches = getMatch(random, people, rules);

        //the matches must be valid and not be the same as the last generated matches
        isValidMatch = validateMatches(newMatches, people.length, rules);

        if (people.length > 2) {
          isValidMatch = isValidMatch && !checkIfMatchesAreIdentical(matches, newMatches);
        }
      } while (!isValidMatch);

      //sort the new matches by first name for display
      newMatches.sort((first, second) => first.giver.name.localeCompare(second.giver.name));

      setMatches(newMatches);
      setCurrentMatchPermutation(random);
      setAreMatchesValidState(true);
      setInvalidMatchesError('');
    } else {
      setMatches([]);
      setAreMatchesValidState(false);
      setInvalidMatchesError('NoMatch');
    }

    setAreMatchesLoading(false);
  };

  useEffect(generateMatches, [people, rules]);

  const toggleRule = (name: string) => {
    rules[name] = !rules[name];
    setRules({ ...rules });
  };

  const addPerson = (person: Person) => {
    person.name = person.name.trim();
    person.household = person.household.trim();

    const isValid = person.name !== undefined && person.name !== '' && !people.some((p) => p.name === person.name);

    if (isValid) {
      setPeople([...people, person]);
    }
  };

  const removePerson = (name: string) => {
    const index = people.findIndex((p) => p.name === name);

    if (people[index] !== undefined) {
      people.splice(index, 1);
      setPeople([...people]);
    }
  };

  const resetPeople = () => {
    setPeople([]);
  };

  return (
    <div className="app bg-gray-100 mh-screen sm:flex sm:flex-column justify-center">
      <People people={people} addPerson={addPerson} removePerson={removePerson} resetPeople={resetPeople} />
      <Matches
        matches={matches}
        areMatchesGenerating={false}
        areMatchesValid={false}
        regenerateMatches={generateMatches}
      />
    </div>
  );
}
