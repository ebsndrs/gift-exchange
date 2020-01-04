import React from 'react';
import { ParticipantsTableProps } from '../interfaces/props/ParticipantsTableProps';
import ParticipantsTableRow from './ParticipantsTableRow';
import GenderHelper from '../helpers/GenderHelper';
import { Participant } from '../interfaces/models/Participant';
import { Gender } from '../interfaces/models/Gender';

export default class ParticipantsTable extends React.Component<ParticipantsTableProps> {
  genderHelper: GenderHelper;

  constructor(props: ParticipantsTableProps) {
    super(props);

    this.genderHelper = new GenderHelper();
  }

  render(): JSX.Element {
    let households = [...this.props.households];
    
    if (households.every(household => household === undefined)) {
      households = [ "None" ]
    } else {
      households.unshift("None");
    }

    const distinctHouseholds = Array.from(new Set(households));
    
    let genders = this.genderHelper.getGendersAsStringArray();

    return(
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Household</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Exlusions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.participants.map(participant =>
              <ParticipantsTableRow
                index={this.props.participants.indexOf(participant)}
                participant={participant}
                households={distinctHouseholds}
                genders={genders}
                handleNameChange={this.handleParticipantNameChange}
                handleHouseholdChange={this.handleParticipantHouseholdChange}
                handleGenderChange={this.handleParticipantGenderChange} 
              />  
            )
            }
          </tbody>
        </table>
        <button className="button" onClick={this.addParticipant}>Add Participant</button>
      </div>
    );
  }

  addParticipant = (): void => {
    let participant: Participant = {
      name: "",
      household: undefined,
      gender: undefined,
      age: undefined,
      exclusions: undefined
    };

    this.props.addParticipant(participant);
  }

  handleParticipantNameChange = (index: number, newName: string): void => {
    this.props.handleParticipantNameChange(index, newName);
  }

  handleParticipantHouseholdChange = (index: number, newHousehold: string): void => {
    this.props.handleParticipantHouseholdChange(index, newHousehold);
  }

  handleParticipantGenderChange = (index:  number, newGender: Gender): void => {
    this.props.handleParticipantGenderChange(index, newGender);
  }
}