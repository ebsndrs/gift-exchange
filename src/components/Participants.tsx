import React from 'react';
import { ParticipantsProps } from '../interfaces/props/ParticipantsProps';
import Participant from './Participant';

export default class Participants extends React.Component<ParticipantsProps> {
  render(): JSX.Element {
    return(
      <div>
        {this.props.participants.map(item => <Participant participant={item} />)}
      </div>
    );
  }
}