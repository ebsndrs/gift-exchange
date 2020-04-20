import React, { useState, useEffect } from 'react';
import { PeopleProps, Person } from '../types';
import PeopleRow from './PeopleRow';

export default function People(props: PeopleProps) {
  const households = [...new Set(props.people.map((person) => person.household))];

  const [person, setPerson] = useState<Person>({
    name: '',
    household: '',
  });
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);
  const [isClearButtonDisabled, setIsClearButtonDisabled] = useState(true);

  useEffect(() => {
    const trimmedName = person.name.trim();
    const trimmedHousehold = person.household.trim();

    const shouldAddButtonBeDisabled =
      trimmedName === '' || props.people.some((p) => p.name === trimmedName) || props.people.length + 1 > 170;
    const shouldClearButtonBeDisabled = trimmedName === '' && trimmedHousehold === '';

    setIsAddButtonDisabled(shouldAddButtonBeDisabled);
    setIsClearButtonDisabled(shouldClearButtonBeDisabled);
  }, [person, props.people]);

  const clearInput = () => {
    setPerson({
      name: '',
      household: '',
    });
  };

  const changeName = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPerson({
      ...person,
      name: event.target.value,
    });
  };

  const pressInputKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13 && !isAddButtonDisabled) {
      event.preventDefault();
      addPerson();
      document.getElementById('name')?.focus();
    }
  };

  const changeHousehold = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPerson({
      ...person,
      household: event.target.value,
    });
  };

  const addPerson = () => {
    props.addPerson(person);

    setPerson({
      name: '',
      household: '',
    });
  };

  return (
    <div className="mx-2 my-4 bg-white overflow-hidden shadow rounded-lg">
      <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-2">
            <h1 className="text-lg leading-6 font-medium text-gray-900">Participants</h1>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <span className="relative z-0 inline-flex shadow-sm">
              <button
                title="Import"
                type="button"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              >
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <button
                onClick={props.clearPeople}
                disabled={props.people.length === 0}
                title="Clear"
                type="button"
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-5">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                value={person.name}
                onChange={(e) => changeName(e)}
                onKeyPress={(e) => pressInputKey(e)}
                id="name"
                className="form-input block w-full sm:text-sm sm:leading-5"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="household" className="sr-only">
              Household
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                value={person.household}
                onChange={(e) => changeHousehold(e)}
                onKeyPress={(e) => pressInputKey(e)}
                id="household"
                list="households"
                className="form-input block w-full sm:text-sm sm:leading-5"
                placeholder="Household"
              />
              <datalist id="households">
                {households.map((household) => (
                  <option key={household} value={household} />
                ))}
              </datalist>
            </div>
          </div>
          <div className="sm: col-span-1 text-left sm:text-right">
            <span className="relative z-0 inline-flex shadow-sm mt-1">
              <button
                onClick={clearInput}
                disabled={isClearButtonDisabled}
                title="Clear"
                type="button"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <button
                onClick={addPerson}
                disabled={isAddButtonDisabled}
                title="Add"
                type="button"
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </span>
          </div>
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
            <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="pl-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Household
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody>
                  {props.people.map((person) => (
                    <PeopleRow
                      key={person.name}
                      person={person}
                      people={props.people}
                      households={households}
                      removePerson={props.removePerson}
                      editPerson={props.editPerson}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
