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
        <td><input className="input is-small" type="text" placeholder="Name" /></td>
        <td>
          <div className="select is-small">
            <select>
              {
                this.props.households.map(household =>
                  <option>{household}</option>
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

  handleAgeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const allowedChars = /^\d+$/;
    if (event.target.value === null || !allowedChars.test(event.target.value)) {
      console.log("is null or not digit");
      event.preventDefault();
    }
  }
}