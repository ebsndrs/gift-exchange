import React from 'react';
import { ParticipantsTableRowProps } from '../interfaces/props/ParticipantsTableRowProps';
import GenderHelper from '../helpers/GenderHelper';
import { Gender } from '../interfaces/models/Gender';

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
            <select onChange={(value) => this.handleGenderChange(this.props.index, value)}>
              {
                this.genderHelper.getGendersAsStringArray().map(gender =>
                  <option value={gender}>{gender}</option>
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
    this.props.handleHouseholdChange(index, event.target.value);
  }

  handleGenderChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>): void => {
    let genderEnum: Gender = Gender.none;
    
    if (event.target.value === this.genderHelper.getGenderAsString(Gender.none)) {
      genderEnum = Gender.none;
    } else if (event.target.value === this.genderHelper.getGenderAsString(Gender.male)) {
      genderEnum = Gender.male;
    } else if (event.target.value === this.genderHelper.getGenderAsString(Gender.female)) {
      genderEnum = Gender.female;
    } else if (event.target.value === this.genderHelper.getGenderAsString(Gender.other)) {
      genderEnum = Gender.other;
    } else {
      console.error("Invalid gender enum value")
    }

    this.props.handleGenderChange(index, genderEnum);
  }

  handleAgeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const allowedChars = /^\d+$/;
    if (event.target.value === null || !allowedChars.test(event.target.value)) {
      console.log("is null or not digit");
      event.preventDefault();
    }
  }
}