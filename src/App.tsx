import React, { useState, useEffect } from "react";
import Households from "./components/Households";
import PeopleList from "./components/People";
import RulesList from "./components/Rules";
import MatchesList from "./components/Matches";
import { Rules, Person, Match } from "./types";
import MatchHelper, { generatePermutation } from "./matching";

export default function App() {
  const genders = ["None", "Male", "Female", "Other"];
  const matchHelper = new MatchHelper(genders);

  const [rules, setRules] = useState<Rules>({
    preventCircularGifting: false,
    preventSameHousehold: false,
    preventSameGender: false,
    preventSameAgeGroup: false,
  });
  const [people, setPeople] = useState<Person[]>([]);
  const [households, setHouseholds] = useState<string[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchPermutation, setMatchPermutation] = useState(0);
  const [areMatchesLoading, setAreMatchesLoading] = useState(false);
  const [areMatchesValid, setAreMatchesValid] = useState(false);

  const toggleRule = (name: string) => {
    setRules({
      ...rules,
      [name]: ![name],
    });
  };

  const addPerson = (person: Person) => {
    person.name.trim();
    person.household?.trim();
    person.gender?.trim();

    const isValid =
      person.name !== undefined &&
      person.name !== "" &&
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
      household !== "" &&
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

  const generateMatches = () => {
    if (people.length < 2) {
      setAreMatchesValid(false);
    } else {
      setAreMatchesLoading(true);

      let shuffledPeople = generatePermutation(people, matchPermutation);
      if (shuffledPeople === undefined) {
        setMatchPermutation(0);
        shuffledPeople = generatePermutation(people, matchPermutation);
      } else {
        setMatchPermutation(matchPermutation + 1);
      }

      let adjacencyMatrix = matchHelper.buildAdjacencyMatrix(
        shuffledPeople,
        households,
        rules
      );
      let maxMatches = matchHelper.maximumBipartiteMatching(
        adjacencyMatrix,
        people.length,
        people.length
      );

      if (maxMatches === people.length) {
        let matches = matchHelper.generateMatches(
          shuffledPeople,
          adjacencyMatrix
        );

        while (
          !matchHelper.areMatchesValid(
            people.length,
            matches,
            households,
            rules
          )
        ) {
          shuffledPeople = matchHelper.shufflePeople(people);
          adjacencyMatrix = matchHelper.buildAdjacencyMatrix(
            shuffledPeople,
            households,
            rules
          );
          matches = matchHelper.generateMatches(
            shuffledPeople,
            adjacencyMatrix
          );
        }

        matches.sort((firstMatch, secondMatch) =>
          firstMatch.giver.name.localeCompare(secondMatch.giver.name)
        );
        setMatches(matches);
        setAreMatchesLoading(false);
        setAreMatchesValid(true);
      } else {
        setMatches([]);
        setAreMatchesLoading(false);
        setAreMatchesValid(false);
      }
    }
  };

  useEffect(generateMatches, [people, households, rules]);

  return (
    <div className="app">
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
