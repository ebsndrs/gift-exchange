import React from 'react';
import { ParticipantProps } from '../interfaces/props/ParticipantProps';

export default class Participant extends React.Component<ParticipantProps> {
  render(): JSX.Element {
    return(
      <div>
        {this.props.participant.name}
      </div>
    );
  }
}