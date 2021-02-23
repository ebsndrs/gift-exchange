import React, { useState, useEffect } from "react";
import { PeopleRowProps } from "../types";

export default function PeopleRow(props: PeopleRowProps) {
  const [isEditFormActive, setIsEditFormActive] = useState(false);
  const [editForm, setEditForm] = useState(props.person);
  const [
    isEditFormSubmitButtonDisabled,
    setIsEditFormSubmitButtonDisabled,
  ] = useState(true);

  useEffect(() => {
    if (isEditFormActive) {
      const input = document.getElementById("edit-name") as HTMLInputElement;

      input?.focus();
      input?.setSelectionRange(input.value.length, input.value.length);
    }
  }, [isEditFormActive]);

  useEffect(() => {
    const shouldEditFormSubmitButtonBeDisabled =
      editForm.name.trim() === "" ||
      (editForm.name === props.person.name &&
        editForm.household === props.person.household) ||
      (editForm.name.trim() !== props.person.name &&
        props.people.some((p) => p.name === editForm.name.trim()));

    setIsEditFormSubmitButtonDisabled(shouldEditFormSubmitButtonBeDisabled);
  }, [editForm, props.person, props.people]);

  const activateEditForm = () => {
    setIsEditFormActive(true);
    props.onIsEditFormToggled(true);
  };

  const submitEditForm = () => {
    props.editPerson(props.person.name, editForm);
    setIsEditFormActive(false);
    props.onIsEditFormToggled(false);
  };

  const cancelEditForm = () => {
    setEditForm(props.person);
    setIsEditFormActive(false);
    props.onIsEditFormToggled(false);
  };

  const changeName = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({
      ...editForm,
      name: event.target.value,
    });
  };

  const changeHousehold = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm({
      ...editForm,
      household: event.target.value,
    });
  };

  const pressInputKey = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13 && !isEditFormSubmitButtonDisabled) {
      event.preventDefault();
      submitEditForm();
    }
  };

  return isEditFormActive ? (
    <tr className="bg-white">
      <td className="px-6 py-2 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            id="edit-name"
            value={editForm.name}
            onChange={(e) => changeName(e)}
            onKeyPress={(e) => pressInputKey(e)}
            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            placeholder="Name"
          />
        </div>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            value={editForm.household}
            onChange={(e) => changeHousehold(e)}
            onKeyPress={(e) => pressInputKey(e)}
            id="edit-household"
            list="households"
            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            placeholder="Household"
          />
          <datalist id="households">
            {props.households.map((household) => (
              <option key={household} value={household} />
            ))}
          </datalist>
        </div>
      </td>
      <td>
        <div className="flex-shrink-0 text-right">
          <span className="relative z-0 inline-flex shadow-sm">
            <button
              onClick={cancelEditForm}
              title="Cancel"
              type="button"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
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
              onClick={submitEditForm}
              disabled={isEditFormSubmitButtonDisabled}
              title="Submit"
              type="button"
              className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </span>
        </div>
      </td>
    </tr>
  ) : (
    <tr className="bg-white">
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
        {props.person.name}
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
        {props.person.household}
      </td>
      <td>
        <div className="flex-shrink-0 text-right">
          <span className="relative z-0 inline-flex shadow-sm">
            <button
              id="edit-person-button"
              onClick={activateEditForm}
              disabled={props.isOtherEditFormActive}
              title="Edit"
              type="button"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
              </svg>
            </button>
            <button
              id="remove-person-button"
              onClick={() => props.removePerson(props.person.name)}
              disabled={props.isOtherEditFormActive}
              title="Remove"
              type="button"
              className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-5 h-5">
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </span>
        </div>
      </td>
    </tr>
  );
}
