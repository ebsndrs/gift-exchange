import { Card, CardContent, CardHeader, Grid, Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import HouseholdsList from './components/HouseholdsList';
import PeopleList from './components/PeopleList';
import RulesList from './components/RulesList';
import Person from './interfaces/Person';
import AppState from './interfaces/AppState';
import MatchesList from './components/MatchesList';
import MatchHelper from './matching/MatchHelper';

export default function App() {
  const genders: string[] = ['None', 'Male', 'Female', 'Other'];
  const matchHelper = new MatchHelper(genders);

  const [state, setState] = useState<AppState>({
    rules: {
      preventCircularGifting: false,
      preventSameHousehold: false,
      preventSameGender: false,
      preventSameAgeGroup: false
    },
    people: [],
    households: ['None'],
    matches: [],
    areMatchesGenerating: false,
    areMatchesValid: false,
    matchesMessage: ''
  });

  const changeRule = (name: string, value: boolean) => {
    setState({
      ...state,
      rules: {
        ...state.rules,
        [name]: value
      }
    });
  }

  const addPerson = (person: Person) => {
    person.name.trim();
    person.household?.trim();
    person.gender?.trim();

    const isValid = person.name !== undefined && person.name !== '' && !state.people.some(p => p.name === person.name)

    if (isValid) {
      setState({
        ...state,
        people: [
          ...state.people,
          person
        ]
      });
    }
  }

  const removePerson = (name: string) => {
    const index = state.people.findIndex(p => p.name === name);

    if (state.people[index] !== undefined) {
      state.people.splice(index, 1);
      setState({
        ...state,
        people: [...state.people]
      });
    }
  }

  const addHousehold = (household: string) => {
    household.trim();

    const isValid = household !== undefined && household !== '' && !state.households.includes(household);

    if (isValid) {
      setState({
        ...state,
        households: [
          ...state.households,
          household
        ]
      });
    }
  }

  const removeHousehold = (household: string) => {
    const index = state.households.findIndex(h => h === household);

    if (index !== 0 && state.households[index] !== undefined) {
      const peopleWithHousehold = state.people.filter(p => p.household === state.households[index]);

      peopleWithHousehold.forEach(person => {
        person.household = state.households[0];
      });

      state.households.splice(index, 1);

      setState({
        ...state,
        people: [...state.people],
        households: [...state.households]
      });
    }
  }

  const fillTestData = () => {
    setState({
      ...state,
      households: [...state.households, 'Household 1'],
      people: [
        {
          name: 'Test 1',
          household: 'Household 1',
          gender: genders[0],
          age: 0
        },
        {
          name: 'Test 2',
          household: 'None',
          gender: genders[0],
          age: 0
        },
        {
          name: 'Test 3',
          household: 'Household 1',
          gender: genders[0],
          age: 0
        },
        {
          name: 'Test 4',
          household: 'None',
          gender: genders[0],
          age: 0
        }
      ]
    });
  }

  const generateMatches = () => {
    if (state.people.length < 2) {
      setState({
        ...state,
        areMatchesValid: false,
        matchesMessage: 'Add 2 or more people to start matching.'
      })
    } else {
      setState({
        ...state,
        areMatchesGenerating: true
      });


      let shuffledPeople = matchHelper.shufflePeople(state.people);
      let adjacencyMatrix = matchHelper.buildAdjacencyMatrix(shuffledPeople, state.households, state.rules);
      let maxMatches = matchHelper.maximumBipartiteMatching(adjacencyMatrix, state.people.length, state.people.length);

      if (maxMatches === state.people.length) {
        let matches = matchHelper.generateMatches(shuffledPeople, adjacencyMatrix)

        while (!matchHelper.areMatchesValid(state.people.length, matches, state.households, state.rules)) {
          shuffledPeople = matchHelper.shufflePeople(state.people);
          adjacencyMatrix = matchHelper.buildAdjacencyMatrix(shuffledPeople, state.households, state.rules);
          matches = matchHelper.generateMatches(shuffledPeople, adjacencyMatrix);
        }

        matches.sort((firstMatch, secondMatch) => firstMatch.gifter.name.localeCompare(secondMatch.gifter.name));
        setState({
          ...state,
          matches: matches,
          areMatchesGenerating: false,
          areMatchesValid: true
        });
      } else {
        setState({
          ...state,
          matches: [],
          areMatchesGenerating: false,
          areMatchesValid: false,
          matchesMessage: 'No matches could be made with your current settings. Try changing something.'
        });
      }
    }
  }

  useEffect(generateMatches, [state.people, state.households, state.rules]);

  return (
    <div className="app">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <Button onClick={fillTestData}>Test Data</Button>
            <Button onClick={generateMatches}>Generate matches</Button>
            <CardHeader title="Setup" />
            <CardContent>
              <RulesList
                rules={state.rules}
                changeRule={changeRule}
              />
              <HouseholdsList
                households={state.households}
                addHousehold={addHousehold}
                removeHousehold={removeHousehold}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <PeopleList
            people={state.people}
            households={state.households}
            genders={genders}
            addPerson={addPerson}
            removePerson={(name: string) => removePerson(name)}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MatchesList
            matches={state.matches}
            areMatchesGenerating={state.areMatchesGenerating}
            areMatchesValid={state.areMatchesValid}
            matchesMessage={state.matchesMessage}
          />
        </Grid>
      </Grid>
    </div>
  )
}