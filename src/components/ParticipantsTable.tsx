import React from 'react';
import { ParticipantsTableProps } from '../interfaces/props/ParticipantsTableProps';
import ParticipantsTableRow from './ParticipantsTableRow';
import GenderHelper from '../helpers/GenderHelper';

export default class ParticipantsTable extends React.Component<ParticipantsTableProps> {
  genderHelper: GenderHelper;

  constructor(props: ParticipantsTableProps) {
    super(props);

    this.genderHelper = new GenderHelper();
  }

  render(): JSX.Element {
    const households = this.props.participants.filter(participant => participant !== undefined).map(participant => participant.household) as string[];
    const distinctHouseholds = Array.from(new Set(households));

    const genders = this.genderHelper.getGendersAsStringArray();

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
              <ParticipantsTableRow participant={participant} households={distinctHouseholds} genders={genders}/>)
            }
            <tr>
              <td><input className="input is-small" type="text" placeholder="Name" /></td>
            </tr>
          </tbody>
        </table>
        <button className="button">Add Participant</button>
      </div>
    );
  }
}