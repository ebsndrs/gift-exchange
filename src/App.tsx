import React, { useState, useEffect } from 'react';
import Households from './components/Households';
import PeopleList from './components/People';
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
  const [rules, setRules] = useState<Rules>({
    preventCircularGifting: false,
    preventSameHousehold: false,
    preventSameGender: false,
    preventSameAgeGroup: false,
  });
  const [people, setPeople] = useState<Person[]>([]);
  const [households, setHouseholds] = useState<string[]>(['None']);
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentMatchPermutation, setCurrentMatchPermutation] = useState(0);
  const [areMatchesLoading, setAreMatchesLoading] = useState(false);
  const [areMatchesValidState, setAreMatchesValidState] = useState(false);
  const [invalidMatchesError, setInvalidMatchesError] = useState('');

  const toggleRule = (name: string) => {
    rules[name] = !rules[name];
    setRules({ ...rules });
  };

  const addPerson = (person: Person) => {
    person.name = person.name.trim();
    person.household = person.household.trim();
    person.gender = person.gender.trim();

    const isValid =
      person.name !== undefined &&
      person.name !== '' &&
      !people.some((p) => p.name === person.name);

    if (isValid) {
      people.push(person);
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

  const addHousehold = (household: string) => {
    household = household.trim();

    const isValid =
      household !== undefined &&
      household !== '' &&
      !households.includes(household);

    if (isValid) {
      households.push(household);
      setHouseholds([...households]);
    }
  };

  const removeHousehold = (household: string) => {
    const index = households.findIndex((h) => h === household);

    if (index !== 0 && households[index] !== undefined) {
      people
        .filter((p) => p.household === households[index])
        .forEach((p) => {
          p.household = households[0];
        });

      households.splice(index, 1);

      setPeople([...people]);
      setHouseholds([...households]);
    }
  };

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
    } else if (checkIfMatchingIsPossible(people, households, rules)) {
      let isValidMatch = false;
      let newMatches: Match[] = [];
      const maxPermutations = factorializeN(people.length);
      let random: number = 0;

      //brute force until we find a valid match set
      //the more people, the less likely a collision will occur
      do {
        random = getRandomFromZero(maxPermutations, [currentMatchPermutation]);
        newMatches = getMatch(random, people, rules);

        //the match set must be valid and not be the same as the last current match set
        isValidMatch =
          validateMatches(newMatches, people.length, households, rules) &&
          !checkIfMatchesAreIdentical(matches, newMatches);
      } while (!isValidMatch);

      //sort the new matches by first name for display
      newMatches.sort((first, second) =>
        first.giver.name.localeCompare(second.giver.name)
      );

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

  useEffect(generateMatches, [people, households, rules]);

  return (
    <div className="app">
      <RulesComponent rules={rules} toggleRule={toggleRule} />
      <div>
        <Matches
          matches={matches}
          areMatchesGenerating={false}
          areMatchesValid={false}
          regenerateMatches={generateMatches}
        />
      </div>
    </div>
  );
}
