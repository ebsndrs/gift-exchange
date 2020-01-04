import React from 'react';
import { ParticipantsTableRowProps } from '../interfaces/props/ParticipantsTableRowProps';
import GenderHelper from '../helpers/GenderHelper';

export default class ParticipantsTableRow extends React.Component<ParticipantsTableRowProps> {
  genderHelper: GenderHelper;

  constructor(props: ParticipantsTableRowProps) {
    super(props);

    this.genderHelper = new GenderHelper();

    this.handleAgeInput = this.handleAgeInput.bind(this);
  }

  render(): JSX.Element {
    return(
      <tr>
        <td><input className="input is-small" type="text" placeholder="Name" onChange={(value) => this.handleNameChange(this.props.index, value)}/></td>
        <td>
          <div className="select is-small">
            <select onChange={(value) => this.handleHouseholdChange(this.props.index, value)}>
              {
                this.props.households.map(household =>
                  <option value={household}>{household}</option>
                )
              }
            </select>
          </div>
        </td>
        <td>
          <div className="select is-small">
            <select>
              {
                this.genderHelper.getGendersAsStringArray().map(gender =>
                  <option>{gender}</option>
                )
              }
            </select>
          </div>
        </td>
        <td><input className="input is-small" type="number" placeholder="Age" onChange={(value) => this.handleAgeInput(value)} /></td>
        <td></td>
      </tr>
    );
  }

  handleNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.handleNameChange(index, event.target.value);
  }

  handleHouseholdChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>): void => {
    this.props.handleNameChange(index, event.target.value);
  }

  handleAgeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const allowedChars = /^\d+$/;
    if (event.target.value === null || !allowedChars.test(event.target.value)) {
      console.log("is null or not digit");
      event.preventDefault();
    }
  }
}