import React from 'react';
import 'bulma';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.css';
import { AppState } from './interfaces/states/AppState';
import { Participant } from './interfaces/models/Participant';
import { Gender } from './interfaces/models/Gender';
import ParticipantsTable from './components/ParticipantsTable';
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
        age: 19,
        gender: Gender.male,
        household: mockHouseholds[0],
        exclusions: undefined
      },
      {
        name: "Person 2",
        age:59,
        gender: Gender.male,
        household: mockHouseholds[0],
        exclusions: undefined
      },
      {
        name: "Person 3",
        age:14,
        gender: Gender.female,
        household: mockHouseholds[0],
        exclusions: undefined
      },
      {
        name: "Person 4",
        age: 25,
        gender: Gender.other,
        household: mockHouseholds[1],
        exclusions: undefined
      },
      {
        name: "Person 5",
        age: 73,
        gender:  Gender.female,
        household: mockHouseholds[2],
        exclusions: undefined
      },
      {
        name: "Person 6",
        age: 32,
        gender: Gender.male,
        household: mockHouseholds[1],
        exclusions: undefined
      },
      {
        name: "Person 7",
        age: 53,
        gender: Gender.male,
        household: mockHouseholds[1],
        exclusions: undefined
      },
      {
        name: "Person 8",
        age: 45,
        gender: Gender.female,
        household: mockHouseholds[0],
        exclusions: undefined
      },
      {
        name: "Person 9",
        age: 20,
        gender: Gender.female,
        household: mockHouseholds[1],
        exclusions: undefined
      },
      {
        name: "Person 10",
        age: 29,
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
      rules: {
        enforceHouseholdRule: false,
        enforceAgeGroupRule: false,
        enforceGenderRule: false,
        enforceCircularGiftingRule: false,
        enforcePreviousYearsRule: false,
        previousYearsToEnforce: 3
      }
    };
  }

  render(): JSX.Element {
    return(
      <div className="App">
        <section className="hero is-dark">
          <div className="hero-body">
            <nav className="level">
              <div className="level-left">
                <div className="level-item">
                  <h1 className="title">Secret Santa</h1>
                </div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  <span className="icon is-large">
                    <a href="https://github.com/ebsndrs/secret-santa" className="github-link">
                      <i className="fab fa-2x fa-github"></i>
                    </a>
                  </span>
                </div>
              </div>
            </nav>
          </div>
        </section>
        <section className="section" id="participantsSection">
          <div className="box">
            <h1 className="title is-4">Participants</h1>
            <h1 className="subtitle is-6">Add, remove, edit, or import participants</h1>

            <ParticipantsTable participants={this.state.participants} />
          </div>
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <p><strong>Secret Santa</strong> by <a href="http://ebsndrs.io">Edward Sanders</a></p>
          </div>
        </footer>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <section className="section">
          <div className="columns">
            <div className="column">
              <div className="panel">
                <p className="panel-heading">Rules</p>
                <div className="panel-block">
                  <div className="container">
                    <div className="level">
                      <div className="level-left">
                        <div className="level-item">
                          <h5 className="title is-5">Prevent Household Matches <sup className="tooltip"><span title="This rule prevents matches from occuring within the same household. Enabling ensures givers will only give to those outside of their household." className="icon is-small"><i className="far fa-question-circle"></i></span></sup></h5>
                        </div>
                      </div>
                      <div className="level-right">
                        <div className="level-item">
                          <button className="button is-white is-rounded" onClick={this.toggleHouseholdRule}>
                            <span className="icon is-medium">
                              <i className={this.state.rules.enforceHouseholdRule ? "far fa-2x fa-check-circle has-text-success" : "far fa-2x fa-times-circle has-text-danger"}></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="level">
                      <div className="level-left">
                        <div className="level-item">
                          <div className="content">
                            <h5 className="title is-5">Prevent Circular Matches <sup className="tooltip"><span title="This rule prevents participants from having a circular gift exchange, where a giver and receiver are giving and receiver from each other. Enabling this rule ensures nobody will give to the person from which they receive, and vice versa." className="icon is-small"><i className="far fa-question-circle"></i></span></sup></h5>
                          </div>
                        </div>
                      </div>
                      <div className="level-right">
                        <div className="level-item">
                          <button className="button is-white is-rounded" onClick={this.toggleCircularGiftingRule}>
                            <span className="icon is-medium">
                              <i className={this.state.rules.enforceCircularGiftingRule ? "far fa-2x fa-check-circle has-text-success" : "far fa-2x fa-times-circle has-text-danger"}></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="level">
                      <div className="level-left">
                        <div className="level-item">
                          <h5 className="title is-5">Prevent Same Gender Matches <sup className="tooltip"><span title="This rule prevents matches from occuring between genders. This only prevents those with their gender defined as male or female from giving to each other; those with the 'other' gender are not affected" className="icon is-small"><i className="far fa-question-circle"></i></span></sup></h5>
                        </div>
                      </div>
                      <div className="level-right">
                        <div className="level-item">
                          <button className="button is-white is-rounded" onClick={this.toggleGenderRule}>
                            <span className="icon is-medium">
                              <i className={this.state.rules.enforceGenderRule ? "far fa-2x fa-check-circle has-text-success" : "far fa-2x fa-times-circle has-text-danger"}></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="panel">
                <p className="panel-heading">Participants</p>
                <div className="panel-block">

                </div>
              </div>
            </div>
            <div className="column">
              <div className="panel">
                <p className="panel-heading">Matches</p>
                <div className="panel-block">

                </div>
              </div>
            </div>
          </div>
        </section>
          <div>
            <h1 className="title">Rules</h1>
            <div className="field">
              <label className="checkbox">
                <input type="checkbox" checked={this.state.rules.enforceHouseholdRule} onClick={this.toggleHouseholdRule} />
                Household Rule
              </label>
            </div>
            <div className="field">
              <label className="checkbox">
                <input type="checkbox" checked={this.state.rules.enforceCircularGiftingRule} onClick={this.toggleCircularGiftingRule} />
                Circular Gifting Rule
              </label>
            </div>
            <div className="field">
              <label className="checkbox">
                <input type="checkbox" checked={this.state.rules.enforceGenderRule} onClick={this.toggleGenderRule} />
                Gender Rule
              </label>
            </div>
            {/* <div className="field">
              <label className="checkbox">
                <input type="checkbox" checked={this.state.rules.enforcePreviousYearsRule} onClick={this.togglePreviousYearsRule} />
                Previous Years Rule
              </label>
            </div> */}
          </div>
          <div>
            <h2 className="title">Households</h2>
            {this.state.households.map(item => <p>{item}</p>)}
          </div>
          <div>
            <h2 className="title">Participants</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Household</th>
                  <th>Gender</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.participants.map(participant =>
                    <tr>
                      <td>{participant.name}</td>
                      <td>{participant.household}</td>
                      {/* <td>{this.getGender(participant.gender)}</td> */}
                    </tr>
                  )
                }
              </tbody>
            </table>
            {/* <Participants participants={this.state.participants} /> */}
          </div>
        <button className="button" onClick={this.generateMatches}>Generate Matches</button>
        {this.state.matches.map(item => <Match match={item} />)}
      </div>
    );
  }

  generateMatches = async (): Promise<void> => {
    let matches = await this.matchService.generateMatches(this.state.participants, this.state.rules);

    this.setState({
      matches: matches
    });
  }

  toggleHouseholdRule  = (): void => {
    const currentState = this.state;
    currentState.rules.enforceHouseholdRule = !currentState.rules.enforceHouseholdRule;
    this.setState({
      rules: currentState.rules
    });
  }

  toggleCircularGiftingRule = (): void => {
    const currentState = this.state;
    currentState.rules.enforceCircularGiftingRule = !currentState.rules.enforceCircularGiftingRule;
    this.setState({
      rules: currentState.rules
    });
  }

  toggleGenderRule = (): void => {
    const currentState = this.state;
    currentState.rules.enforceGenderRule = !currentState.rules.enforceGenderRule;
    this.setState({
      rules: currentState.rules
    });
  }

  togglePreviousYearsRule = (): void => {
    const currentState = this.state;
    currentState.rules.enforcePreviousYearsRule = !currentState.rules.enforcePreviousYearsRule;
    this.setState({
      rules: currentState.rules
    });
  }
}