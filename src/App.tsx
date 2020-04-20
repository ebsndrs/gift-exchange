import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import People from './components/People';
import Matches from './components/Matches';
import { Rules, Person, Match, StateCache } from './types';
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
  const firstRun = useRef(true);

  const localStorageState = localStorage.getItem('state');
  const parsedState: StateCache =
    localStorageState !== null
      ? JSON.parse(localStorageState)
      : {
          people: [],
          matches: [],
          rules: { preventSameHousehold: false },
          matchPermutation: 0,
          areMatchesValid: false,
          invalidMatchesError: 'LowerThanMinimum',
        };

  const [people, setPeople] = useState<Person[]>(parsedState.people);
  const [rules, setRules] = useState<Rules>(parsedState.rules);
  const [matches, setMatches] = useState<Match[]>(parsedState.matches);
  const [matchPermutation, setMatchPermutation] = useState(parsedState.matchPermutation);
  const [areMatchesLoading, setAreMatchesLoading] = useState(false);
  const [areMatchesValid, setAreMatchesValid] = useState(parsedState.areMatchesValid);
  const [errorKey, setErrorKey] = useState(parsedState.invalidMatchesError);

  const generateMatches = () => {
    //don't generate matches on initial render. If matches were retrieved
    //from local storage, we want those to be the state. If no matches were retrieved,
    //this function wouldn't do anything anyway.
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    setAreMatchesLoading(true);

    if (people.length < 2) {
      setMatches([]);
      setAreMatchesValid(false);
      setErrorKey('LowerThanMinimum');
    } else if (people.length > 170) {
      setMatches([]);
      setAreMatchesValid(false);
      setErrorKey('GreaterThanMaximum');
    } else if (checkIfMatchingIsPossible(people, rules)) {
      const maxPermutations = factorializeN(people.length);
      let isValidMatch = false;
      let newMatches: Match[] = [];
      let random: number = 0;

      //brute force it until we find a valid match set
      //the more people, the less likely a collision will occur
      do {
        random = getRandomFromZero(maxPermutations, [matchPermutation]);
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
      setMatchPermutation(random);
      setAreMatchesValid(true);
      setErrorKey('');
    } else {
      setMatches([]);
      setAreMatchesValid(false);
      setErrorKey('NoMatch');
    }

    setAreMatchesLoading(false);
  };

  const toggleRule = (name: string) => {
    rules[name] = !rules[name];
    setRules({ ...rules });
  };

  const addPerson = (person: Person) => {
    person.name = person.name.trim();
    person.household = person.household.trim();

    const isValid = person.name !== '' && !people.some((p) => p.name === person.name);

    if (isValid) {
      setPeople([...people, person]);
    }
  };

  const editPerson = (name: string, newPerson: Person) => {
    newPerson.name = newPerson.name.trim();
    newPerson.household = newPerson.household.trim();

    const isValid = people.filter((p) => p.name === name).length === 1;

    if (isValid) {
      const index = people.findIndex((p) => p.name === name);
      people.splice(index, 1, newPerson);
      setPeople([...people]);
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

  const cacheState = () => {
    const cache: StateCache = {
      people: people,
      matches: matches,
      rules: rules,
      matchPermutation: matchPermutation,
      areMatchesValid: areMatchesValid,
      invalidMatchesError: errorKey,
    };

    localStorage.setItem('state', JSON.stringify(cache));
  };

  useEffect(cacheState);

  useLayoutEffect(generateMatches, [people, rules]);

  return (
    <div className="app mh-screen sm:flex sm:flex-column justify-center">
      <People
        people={people}
        addPerson={addPerson}
        editPerson={editPerson}
        removePerson={removePerson}
        clearPeople={resetPeople}
      />
      <Matches
        rules={rules}
        matches={matches}
        areMatchesLoading={areMatchesLoading}
        areMatchesValid={areMatchesValid}
        errorKey={errorKey}
        toggleRule={toggleRule}
        refreshMatches={generateMatches}
      />
    </div>
  );
}
