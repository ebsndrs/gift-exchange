import React from 'react';
import { RuleToggleProps } from '../types';

export default function RuleToggle(props: RuleToggleProps) {
  return (
    <div className="flex justify-between py-1">
      <label>{props.display}</label>
      <span
        role="checkbox"
        onClick={() => props.toggle(props.index)}
        tabIndex={0}
        aria-checked={props.toggled}
        className={`${
          props.toggled ? 'bg-indigo-600' : 'bg-gray-200'
        } relative inline-block flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:shadow-outline`}
      >
        <span
          aria-hidden="true"
          className={`${
            props.toggled ? 'translate-x-5' : 'translate-x-0'
          } inline-block h-5 w-5 rounded-full bg-white shadow transform transition ease-in-out duration-200`}
        ></span>
      </span>
    </div>
  );
}
