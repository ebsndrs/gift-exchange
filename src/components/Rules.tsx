import React from 'react';
import { RulesProps } from '../types';
import RuleToggle from './RuleToggle';

export default function Rules(props: RulesProps) {
  return (
    <div className="w-64">
      <RuleToggle
        display="Prevent Circular Giving"
        index="preventCircularGifting"
        toggled={props.rules.preventCircularGifting}
        toggle={props.toggleRule}
      />
      <RuleToggle
        display="Prevent Same Household"
        index="preventSameHousehold"
        toggled={props.rules.preventSameHousehold}
        toggle={props.toggleRule}
      />
      <RuleToggle
        display="Prevent Same Gender"
        index="preventSameGender"
        toggled={props.rules.preventSameGender}
        toggle={props.toggleRule}
      />
      <RuleToggle
        display="Prevent Same Age Group"
        index="preventSameAgeGroup"
        toggled={props.rules.preventSameAgeGroup}
        toggle={props.toggleRule}
      />
    </div>
  );
}
