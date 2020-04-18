import React, { useState, useEffect } from 'react';
import Households from './components/Households';
import PeopleList from './components/People';
import Matches from './components/Matches';
import { default as RulesComponent } from './components/Rules';
import { Rules, Person, Match } from './types';
import { getMatches, nFactorial, nFactorialDivN, getPermutation } from './matching';
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
    // { name: 'Beth', household: 'None', gender: 'None', age: 0 },
  ]);
  const [households, setHouseholds] = useState<string[]>([]);
  const [matches, setMatches] = useState<Match[][]>([]);
  const [matchPermutation, setMatchPermutation] = useState(0);
  const [areMatchesLoading, setAreMatchesLoading] = useState(false);
  const [areMatchesValid, setAreMatchesValid] = useState(false);
  const [permutations, setPermutations] = useState<Person[][]>([]);

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

  const generatePermutations = () => {
    let permutations: Person[][] = [];

    for (let i = 0; i < nFactorial[people.length]; i++) {
      const p = getPermutation(people, i);

      permutations.push(p);
    }

    setPermutations(permutations);
  };

  const generateMatches = () => {
    if (people.length < 2) {
      setAreMatchesValid(false);
    } else {
      setAreMatchesLoading(true);

      let temp2: Match[][] = [];

      for (let i = 0; i < nFactorialDivN[people.length]; i++) {
        const temp = getMatches(people, i, households, rules);

        temp2.push(temp);
      }

      setMatches(temp2);
      //   let shuffledPeople = generatePermutation(people, matchPermutation);
      //   if (shuffledPeople === undefined) {
      //     setMatchPermutation(0);
      //     shuffledPeople = generatePermutation(people, matchPermutation);
      //   } else {
      //     setMatchPermutation(matchPermutation + 1);
      //   }

      //   let adjacencyMatrix = matchHelper.buildAdjacencyMatrix(
      //     shuffledPeople,
      //     households,
      //     rules
      //   );
      //   let maxMatches = matchHelper.maximumBipartiteMatching(
      //     adjacencyMatrix,
      //     people.length,
      //     people.length
      //   );

      //   if (maxMatches === people.length) {
      //     let matches = matchHelper.generateMatches(
      //       shuffledPeople,
      //       adjacencyMatrix
      //     );

      //     while (
      //       !matchHelper.areMatchesValid(
      //         people.length,
      //         matches,
      //         households,
      //         rules
      //       )
      //     ) {
      //       shuffledPeople = matchHelper.shufflePeople(people);
      //       adjacencyMatrix = matchHelper.buildAdjacencyMatrix(
      //         shuffledPeople,
      //         households,
      //         rules
      //       );
      //       matches = matchHelper.generateMatches(
      //         shuffledPeople,
      //         adjacencyMatrix
      //       );
      //     }

      //     matches.sort((firstMatch, secondMatch) =>
      //       firstMatch.giver.name.localeCompare(secondMatch.giver.name)
      //     );
      //     setMatches(matches);
      //     setAreMatchesLoading(false);
      //     setAreMatchesValid(true);
      //   } else {
      //     setMatches([]);
      //     setAreMatchesLoading(false);
      //     setAreMatchesValid(false);
      //   }
    }
  };

  useEffect(generateMatches, [people, households, rules, matchPermutation]);
  useEffect(generatePermutations, [people]);

  return (
    <div className="app mx-64">
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
          regenerateMatches={() => console.log('hi')}
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
