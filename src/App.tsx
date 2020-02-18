import { Card, CardContent, CardHeader, Grid, Button } from '@material-ui/core';
import React, { useState } from 'react';
import './App.css';
import HouseholdsList from './components/HouseholdsList';
import PeopleList from './components/PeopleList';
import RulesList from './components/RulesList';
import Person from './interfaces/Person';
import AppState from './interfaces/AppState';
import MatchesList from './components/MatchesList';
import MaxFlow from './matching/MaxFlow';

export default function App() {
  const genders: string[] = ['None', 'Male', 'Female', 'Other'];

  const [state, setState] = useState<AppState>({
    rules: {
      preventCircularGifting: false,
      preventSameHousehold: false,
      preventSameGender: false,
      preventSameAgeGroup: false
    },
    people: [],
    households: ['None'],
    matches: []
  });

  const changeRule = (name: string, value: boolean) => {
    setState({ ...state,
      rules: { ...state.rules,
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

  const generateMatches = () => {

  }

  const getMaxFlow = () => {
    let graph: number[][] = [
      [0, 16, 13, 0, 0, 0],
      [0, 0, 10, 12, 0, 0],
      [0, 4, 0, 0, 14, 0],
      [0, 0, 9, 0, 0, 20],
      [0, 0, 0, 7, 0, 4],
      [0, 0, 0, 0, 0, 0]
    ];

    console.log(`The maximum possible flow is ${MaxFlow(graph, 6)}`)
  }

  // const generateMatches = () => {
  //   setGeneratingMatches(true);

  //   if (people.length < 2) {
  //     setMatches({
  //       items: [],
  //       error: true,
  //       message: 'You don\'t have enough people to generate matches.'
  //     });
  //     return;
  //   }

  //   let oldMatches = matches.items;
  //   let newMatches = GenerateMatches(rules, people);

  //   if (!newMatches.error && newMatches.items.length > 2) {
  //     while (areMatchArraysSame(oldMatches, newMatches.items)) {
  //       newMatches = GenerateMatches(rules, people);
  //     }
  //   }

  //   setMatches(newMatches);

  //   setGeneratingMatches(false);
  //   // let oldMatches: Match[] | undefined;

  //   // if (matches !== undefined) {
  //   //   oldMatches = [...matches];
  //   // } else {
  //   //   oldMatches = [];
  //   // }
  //   // let newMatches: Match[] | undefined = GenerateMatches(rules, people);

  //   // if (newMatches !== undefined) {
  //   //   if (newMatches.length > 2) {
  //   //     while (areMatchArraysSame(oldMatches, newMatches!)) {
  //   //       newMatches = GenerateMatches(rules, people);
  //   //     }
  //   //   }

  //   //   console.log(newMatches);
  //   //   setMatches(newMatches);
  //   // }

  //   // setGeneratingMatches(false);
  // }


  // const areMatchArraysSame = (oldMatches: Match[], newMatches: Match[]): boolean => {
  //   if (oldMatches.length !== newMatches.length) {
  //     return false;
  //   }

  //   for (let i = 0; i < oldMatches.length; i++) {
  //     if (oldMatches[i].giver.name === newMatches[i].giver.name && oldMatches[i].receiver.name !== newMatches[i].receiver.name) {
  //       return false;
  //     }
  //   }

  //   return true;
  // }

  // useEffect(generateMatches, [people, households, rules]);

  // const sampleHouseholds = () => {
  //   setHouseholds([
  //     ...households,
  //     'Sanders',
  //     'Vitale',
  //     'Bracy',
  //     'Marcus'
  //   ]);
  // }

  // const samplePeople = () => {
  //   setPeople([
  //     {
  //       name: 'Edward',
  //       household: households[1],
  //       gender: 'Male',
  //       age: 0
  //     },
  //     {
  //       name: 'Heater',
  //       household: households[1],
  //       gender: 'Female',
  //       age: 0
  //     },
  //     {
  //       name: 'Jim',
  //       household: households[2],
  //       gender: 'Male',
  //       age: 0
  //     },
  //     {
  //       name: 'Isabel',
  //       household: households[2],
  //       gender: 'Female',
  //       age: 0
  //     },
  //     {
  //       name: 'Mary',
  //       household: households[3],
  //       gender: 'Female',
  //       age: 0
  //     },
  //     {
  //       name: 'Michael',
  //       household: households[3],
  //       gender: 'Male',
  //       age: 0
  //     },
  //     {
  //       name: 'Shane',
  //       household: households[4],
  //       gender: 'Male',
  //       age: 0
  //     },
  //     {
  //       name: 'Clara',
  //       household: households[4],
  //       gender: 'Male',
  //       age: 0
  //     }
  //   ]);
  // }

  return (
    <div className="app">
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <Button onClick={getMaxFlow}>Test Max Flow</Button>
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
          <MatchesList matches={state.matches} />
        </Grid>
      </Grid>
    </div>
  )
}