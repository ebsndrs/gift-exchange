import React from 'react';
import { MatchProps } from '../interfaces/props/MatchProps';

export default class Match extends React.Component<MatchProps> {
  render(): JSX.Element {
    return(
      <div>
        <p>{this.props.match.giver.name} gives to {this.props.match.receiver?.name}</p>
      </div>
    );
  }
}