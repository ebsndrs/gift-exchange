import React, { useState, useEffect } from 'react';
import Households from './components/Households';
import PeopleList from './components/People';
import Matches from './components/Matches';
import { default as RulesComponent } from './components/Rules';
import { Rules, Person, Match } from './types';
import {
  getMatches,
  nFactorialDivN,
  buildAdjacencyMatrix,
  maximumBipartiteMatching,
  getRandomInt,
  nFactorial,
} from './matching';
import './tailwind.css';

export default function App() {
  const genders = ['None', 'Male', 'Female', 'Other'];
  // const matchHelper = new MatchHelper(genders);

  const [rules, setRules] = useState<Rules>({
    preventCircularGifting: false,
    preventSameHousehold: false,
    preventSameGender: false,
    preventSameAgeGroup: false,
  });
  const [people, setPeople] = useState<Person[]>([
    { name: 'Ed', household: 'None', gender: 'None', age: 0 },
    { name: 'Heather', household: 'None', gender: 'None', age: 0 },
    { name: 'James', household: 'None', gender: 'None', age: 0 },
    { name: 'JJ', household: 'None', gender: 'None', age: 0 },
    { name: 'Xiaoli', household: 'None', gender: 'None', age: 0 },
    { name: 'Alice', household: 'None', gender: 'None', age: 0 },
    { name: 'Isabel', household: 'None', gender: 'None', age: 0 },
    { name: 'Mary', household: 'None', gender: 'None', age: 0 },
    { name: 'Clara', household: 'None', gender: 'None', age: 0 },
    { name: 'Beth', household: 'None', gender: 'None', age: 0 },
    { name: 'Johnny', household: 'None', gender: 'None', age: 0 },
    { name: 'Jim', household: 'None', gender: 'None', age: 0 },
    { name: 'Glenn', household: 'None', gender: 'None', age: 0 },
    { name: 'Cathy', household: 'None', gender: 'None', age: 0 },
    { name: 'Alex', household: 'None', gender: 'None', age: 0 },
    { name: 'Tom', household: 'None', gender: 'None', age: 0 },
    { name: 'Leslie', household: 'None', gender: 'None', age: 0 },
    { name: 'Ron', household: 'None', gender: 'None', age: 0 },
  ]);
  const [households, setHouseholds] = useState<string[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchPermutation, setMatchPermutation] = useState(0);
  const [areMatchesLoading, setAreMatchesLoading] = useState(false);
  const [areMatchesValid, setAreMatchesValid] = useState(false);
  const [invalidMatchesError, setInvalidMatchesError] = useState('');

  const toggleRule = (name: string) => {
    rules[name] = !rules[name];
    setRules({ ...rules });
  };

  const addPerson = (person: Person) => {
    person.name.trim();
    person.household?.trim();
    person.gender?.trim();

    const isValid =
      person.name !== undefined &&
      person.name !== '' &&
      !people.some((p) => p.name === person.name);

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

  const addHousehold = (household: string) => {
    household.trim();

    const isValid =
      household !== undefined &&
      household !== '' &&
      !households.includes(household);

    if (isValid) {
      setHouseholds([...households, household]);
    }
  };

  const removeHousehold = (household: string) => {
    const index = households.findIndex((h) => h === household);

    if (index !== 0 && households[index] !== undefined) {
      const peopleWithHousehold = people.filter(
        (p) => p.household === households[index]
      );

      peopleWithHousehold.forEach((person) => {
        person.household = households[0];
      });

      households.splice(index, 1);

      setPeople([...people]);
      setHouseholds([...households]);
    }
  };

  const cycleMatches = () => {
    generateMatches();
  };

  const generateMatches = () => {
    //We can do anything until we have 2 people
    if (people.length < 2) {
      setAreMatchesValid(false);
      setInvalidMatchesError(
        'Please add two or more people to start generating matches.'
      );

      return;
    }

    //18! causes an integer overflow in javascript, so 18 is the max of people supported
    if (people.length > 18) {
      setAreMatchesValid(false);
      setInvalidMatchesError(
        "Can't generated matches for more than 18 people."
      );

      return;
    }

    setAreMatchesLoading(true);

    let newMatches: Match[] = [];

    // const numberOfPotentialMatches = nFactorialDivN[people.length];

    const matrix = buildAdjacencyMatrix(people, households, rules);

    const maximumMatches = maximumBipartiteMatching(
      matrix,
      people.length,
      people.length
    );

    if (maximumMatches < 1) {
      setMatches([]);
      setAreMatchesValid(false);
      setInvalidMatchesError(
        'No complete match set can be made with the supplied rules'
      );
    } else {
      //get a match from a random permutation
      let newMatches: Match[] = [];
      let n = getRandomInt(0, nFactorial[people.length] - 1);

      //regenerate n if it matches the current permutation
      while (n === matchPermutation) {
        n = getRandomInt(0, nFactorial[people.length] - 1);
      }

      console.log('n = ' + n);

      newMatches = getMatches(people, n, households, rules);
      console.log(newMatches);

      //if a match wasn't found, try with a new random permutation
      while (newMatches.length === 0) {
        let newN = getRandomInt(0, nFactorial[people.length] - 1);

        //if we generated the same  random number, try again (but only if there is more than 1 possible match)
        while (newN === n && people.length > 2) {
          newN = getRandomInt(0, nFactorial[people.length] - 1);
        }

        n = newN;
        newMatches = getMatches(people, n, households, rules);
        console.log(newMatches);
      }

      setMatches(newMatches);
      setMatchPermutation(n);
      setAreMatchesValid(true);
      setInvalidMatchesError('');
    }
    // //by setting i to the number the current permutation, we can use this function
    // //for both generating matches the first time and first regenerating them with
    // //the guarantee that the next match set will be different.
    // for (let i = matchPermutation; i < numberOfPotentialMatches; i++) {
    //   //try to get a match for the supplied permutation and rules
    //   const potentialMatchSet = getMatches(people, i, households, rules);

    //   if (potentialMatchSet.length !== people.length) {
    //     continue; //the match function couldn't generate match. Try the next permutation
    //   } else {
    //     newMatches = potentialMatchSet;

    //     //sort matches by name of the giver
    //     // newMatches.sort((first, second) =>
    //     //   first.giver.name.localeCompare(second.giver.name)
    //     // );

    //     setMatches(newMatches);

    //     return;
    //   }
    // }

    // //if we've reached this point, then no matches could be found.

    // setMatches([]);
    // setAreMatchesValid(false);
    // setInvalidMatchesError(
    //   'No complete match set can be made with the supplied rules'
    // );
    // setAreMatchesLoading(false);
  };

  useEffect(generateMatches, [people, households, rules]);

  return (
    <div className="app">
      {/* <RulesComponent rules={rules} toggleRule={toggleRule} /> */}
      <div>
        {/* <div>
          {permutations.map((x, index) => (
            <div className="mb-4">
              <h1 className="font-bold">Permutation {index}</h1>
              {x.map((y) => (
                <div>{y.name}</div>
              ))}
            </div>
          ))}
        </div> */}
        <Matches
          matches={matches}
          areMatchesGenerating={false}
          areMatchesValid={false}
          regenerateMatches={cycleMatches}
        />
      </div>
      {/* <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardHeader title="Setup" />
            <CardContent>
              <RulesList rules={rules} changeRule={toggleRule} />
              <Households
                households={households}
                addHousehold={addHousehold}
                removeHousehold={removeHousehold}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <PeopleList
            people={people}
            households={households}
            genders={genders}
            addPerson={addPerson}
            removePerson={removePerson}
            resetPeople={resetPeople}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MatchesList
            matches={matches}
            areMatchesGenerating={areMatchesLoading}
            areMatchesValid={areMatchesValid}
            // matchesMessage={matchesMessage}
            regenerateMatches={generateMatches}
          />
        </Grid>
      </Grid> */}
    </div>
  );
}
