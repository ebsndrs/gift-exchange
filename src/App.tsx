import React from 'react';
import 'bulma';
import './App.css';
import { AppState } from './interfaces/states/AppState';
import { Participant } from './interfaces/Participant';
import { Gender } from './interfaces/Gender';
import Participants from './components/Participants';
import MatchService from './services/MatchService';
import Match from './components/Match';

export default class App extends React.Component<any, AppState> {
  matchService: MatchService;

  constructor(props: any) {
    super(props);

    this.matchService = new MatchService();

    const mockHouseholds: string[] = [
      "Household 1",
      "Household 2",
      "Household 3"
    ];

    const mockParticipants: Participant[] = [
      {
        name: "Person 1",
        dob: new Date(1930, 8, 11),
        gender: Gender.male,
        household: mockHouseholds[0],
        exclusions: undefined
      },
      {
        name: "Person 2",
        dob: new Date(1950, 9, 27),
        gender: Gender.male,
        household: mockHouseholds[0],
        exclusions: undefined
      },
      {
        name: "Person 3",
        dob: new Date(1958, 10, 25),
        gender: Gender.female,
        household: mockHouseholds[0],
        exclusions: undefined
      },
      {
        name: "Person 4",
        dob: new Date(1973, 12, 13),
        gender: Gender.other,
        household: mockHouseholds[1],
        exclusions: undefined
      },
      {
        name: "Person 5",
        dob: new  Date(1986, 7, 26),
        gender:  Gender.female,
        household: mockHouseholds[2],
        exclusions: undefined
      },
      {
        name: "Person 6",
        dob: new Date(1987, 3, 11),
        gender: Gender.male,
        household: mockHouseholds[1],
        exclusions: undefined
      },
      {
        name: "Person 7",
        dob: new Date(2001, 1, 19),
        gender: Gender.male,
        household: mockHouseholds[1],
        exclusions: undefined
      },
      {
        name: "Person 8",
        dob: new Date(2005, 11, 23),
        gender: Gender.female,
        household: mockHouseholds[0],
        exclusions: undefined
      },
      {
        name: "Person 9",
        dob: new Date(2011, 3, 31),
        gender: Gender.female,
        household: mockHouseholds[1],
        exclusions: undefined
      },
      {
        name: "Person 10",
        dob: new Date(2016, 10, 1),
        gender: Gender.other,
        household: mockHouseholds[0],
        exclusions: undefined
      }
    ];

    this.state = {
      participants: mockParticipants,
      households: mockHouseholds,
      matches: [],
      previousYears: [],
      isHouseholdRuleActive: false,
      isGenderRuleActive: false,
      isAgeGroupRuleActive: false,
      isPreviousYearsRuleActive: false,
      previousYearsToMatchAgainst: 0
    };
  }

  render(): JSX.Element {
    return(
      <div className="App">
        <div className="container">
          <h2 className="title">Secret Santa</h2>
          <div>
            <h1 className="title">Rules</h1>
            <div className="field">
              <label className="checkbox">
                <input type="checkbox" checked={this.state.isHouseholdRuleActive} onClick={this.toggleHouseholdRule} />
                Household Rule
              </label>
            </div>
            <div className="field">
              <label className="checkbox">
                <input type="checkbox" checked={this.state.isAgeGroupRuleActive} onClick={this.toggleAgeGroupRule} />
                Age Group Rule
              </label>
            </div>
            <div className="field">
              <label className="checkbox">
                <input type="checkbox" checked={this.state.isGenderRuleActive} onClick={this.toggleGenderRule} />
                Gender Rule
              </label>
            </div>
            <div className="field">
              <label className="checkbox">
                <input type="checkbox" checked={this.state.isPreviousYearsRuleActive} onClick={this.togglePreviousYearsRule} />
                Previous Years Rule
              </label>
            </div>
          </div>
          <div>
            <h2 className="title">Households</h2>
            {this.state.households.map(item => <p>{item}</p>)}
          </div>
          <div>
            <h2 className="title">Participants</h2>
            <Participants participants={this.state.participants} />
          </div>
        </div>
        <button className="button" onClick={this.generateMatches}>Generate Matches</button>
        {this.state.matches.map(item => <Match match={item} />)}
      </div>
    );
  }

  generateMatches = (): void => {
    let matches = this.matchService.generateMatches(this.state.participants);

    this.setState({
      matches: matches
    });
  }

  toggleHouseholdRule  = (): void => {
    const currentState = this.state.isHouseholdRuleActive;
    this.setState({
      isHouseholdRuleActive: !currentState
    });
  }

  toggleAgeGroupRule = (): void => {
    const currentState = this.state.isAgeGroupRuleActive;
    this.setState({
      isAgeGroupRuleActive: !currentState
    });
  }

  toggleGenderRule = (): void => {
    const currentState = this.state.isGenderRuleActive;
    this.setState({
      isGenderRuleActive: !currentState
    });
  }

  togglePreviousYearsRule = (): void => {
    const currentState = this.state.isPreviousYearsRuleActive;
    this.setState({
      isPreviousYearsRuleActive: !currentState
    });
  }
}