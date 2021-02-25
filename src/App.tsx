import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import People from "./components/People";
import Matches from "./components/Matches";
import { Rules, Person, Match, StateCache } from "./types";
import {
  getMatch,
  getRandomFromZero,
  checkIfMatchingIsPossible,
  checkIfMatchesAreIdentical,
  factorializeN,
  validateMatches,
} from "./matching";

export default function App() {
  const firstRun = useRef(true);

  const localStorageState = localStorage.getItem("state");
  const parsedState: StateCache =
    localStorageState !== null
      ? JSON.parse(localStorageState)
      : {
          people: [],
          matches: [],
          rules: { preventSameHousehold: false },
          matchPermutation: 0,
          areMatchesValid: false,
          invalidMatchesError: "LowerThanMinimum",
        };

  const [people, setPeople] = useState<Person[]>(parsedState.people);
  const [rules, setRules] = useState<Rules>(parsedState.rules);
  const [matches, setMatches] = useState<Match[]>(parsedState.matches);
  const [matchPermutation, setMatchPermutation] = useState(
    parsedState.matchPermutation
  );
  const [areMatchesLoading, setAreMatchesLoading] = useState(false);
  const [areMatchesValid, setAreMatchesValid] = useState(
    parsedState.areMatchesValid
  );
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
      setErrorKey("LowerThanMinimum");
    } else if (people.length > 170) {
      setMatches([]);
      setAreMatchesValid(false);
      setErrorKey("GreaterThanMaximum");
    } else if (checkIfMatchingIsPossible(people, rules)) {
      const maxPermutations = factorializeN(people.length);
      let isValidMatch = false;
      let newMatches: Match[] = [];
      let random = 0;

      //brute force it until we find a valid match set
      //the more people, the less likely a collision will occur
      do {
        random = getRandomFromZero(maxPermutations, [matchPermutation]);
        newMatches = getMatch(random, people, rules);

        //the matches must be valid and not be the same as the last generated matches
        isValidMatch = validateMatches(newMatches, people.length, rules);

        if (people.length > 2) {
          isValidMatch =
            isValidMatch && !checkIfMatchesAreIdentical(matches, newMatches);
        }
      } while (!isValidMatch);

      //sort the new matches by first name for display
      newMatches.sort((first, second) =>
        first.giver.name.localeCompare(second.giver.name)
      );

      setMatches(newMatches);
      setMatchPermutation(random);
      setAreMatchesValid(true);
      setErrorKey("");
    } else {
      setMatches([]);
      setAreMatchesValid(false);
      setErrorKey("NoMatch");
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

    const isValid =
      person.name !== "" && !people.some((p) => p.name === person.name);

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

    localStorage.setItem("state", JSON.stringify(cache));
  };

  useEffect(cacheState);

  useLayoutEffect(generateMatches, [people, rules]);

  return (
    <div className="px-4 py-5 sm:flex justify-center">
      <div className="max-w-screen-xl">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6 flex justify-between flex-row">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl leading-9 ">
                Gift Exchange
              </h1>
            </div>
            <div>
              <a href="https://github.com/itsthekeming/gift-exchange">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 24 24"
                  className="h-9 w-9"
                >
                  <title>GitHub icon</title>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="space-y-4 sm:py-4 sm:space-y-0 sm:space-x-4 sm:flex sm:flex-row">
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
      </div>
    </div>
  );
}
