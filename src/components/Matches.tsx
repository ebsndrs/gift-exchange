import React, { useState } from "react";
import { MatchesProps } from "../types";
import RuleToggle from "./RuleToggle";
import { getMatchingErrorMessage } from "../matching";
import Spinner from "./Spinner";
import Transition from "./Transition";

export default function Matches(props: MatchesProps) {
  const [isExportDropdownVisible, setIsExportDropdownVisible] = useState(false);

  const copyToClipboard = async () => {
    const clipboardString = props.matches
      .map((match) => `${match.giver.name} gives to ${match.receiver.name}.`)
      .join("\n");

    await navigator.clipboard.writeText(clipboardString);

    setIsExportDropdownVisible(false);
  };

  const exportToCsv = () => {
    const hiddenLink = document.getElementById(
      "csv-download"
    ) as HTMLAnchorElement;
    hiddenLink.click();
  };

  const encodeCsv = () => {
    let csv = "Giver,Receiver\n";
    props.matches.forEach((match) => {
      const giverName = match.giver.name.replace(",", "\\,");
      const receiverName = match.receiver.name.replace(",", "\\,");

      csv += `${giverName},${receiverName}\n`;
    });

    return csv;
  };

  return (
    <div className="my-4 sm:my-0 bg-white overflow-hidden shadow rounded-lg">
      <a
        className="sr-only"
        id="csv-download"
        href={`data:text/csv;charset=utf-8,${encodeURI(encodeCsv())}`}
        download="gift_exchange.csv"
        target="_blank"
        rel="noopener noreferrer"
      >
        Download Matches as CSV
      </a>
      <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-no-wrap">
          <div className="ml-4 mt-2">
            <h1 className="text-lg leading-6 font-medium text-gray-900">
              Results
            </h1>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <span className="relative z-10 inline-flex shadow-sm">
              <button
                onClick={props.refreshMatches}
                disabled={!props.areMatchesValid}
                title="Refresh matches"
                type="button"
                className="-ml-px relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 disabled:text-gray-300 disabled:cursor-not-allowed"
              >
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              <span className="-ml-px relative block">
                <button
                  onClick={() =>
                    setIsExportDropdownVisible(!isExportDropdownVisible)
                  }
                  disabled={!props.areMatchesValid}
                  title="Export matches"
                  type="button"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150 disabled:text-gray-300 disabled:cursor-not-allowed"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
                <Transition
                  show={isExportDropdownVisible}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div className="origin-top-right absolute right-0 mt-2 -mr-1 w-40 rounded-md shadow-lg">
                    <div className="rounded-md bg-white shadow-xsleft">
                      <button
                        onClick={copyToClipboard}
                        disabled={props.matches.length === 0}
                        className="w-full block px-4 py-2 text-sm leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 disabled:cursor-not-allowed"
                      >
                        Copy to clipboard
                      </button>
                      <button
                        onClick={exportToCsv}
                        disabled={props.matches.length === 0}
                        className="w-full block px-4 py-2 text-sm leading-5 text-left text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 disabled:cursor-not-allowed"
                      >
                        Export to CSV
                      </button>
                    </div>
                  </div>
                </Transition>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div>
          <RuleToggle
            display="Prevent Same Household"
            index="preventSameHousehold"
            toggled={props.rules.preventSameHousehold}
            toggle={props.toggleRule}
          />
        </div>
        {props.areMatchesLoading ? (
          <div className="mt-6 h-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : props.areMatchesValid ? (
          <div className="mt-6 flex flex-col">
            <div className="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div className="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Giver
                      </th>
                      <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Receiver
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.matches.map((match) => (
                      <tr key={match.giver.name} className="bg-white">
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                          {match.giver.name}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                          {match.receiver.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 w-full text-sm">
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm leading-5 font-medium text-red-800">
                    {getMatchingErrorMessage(props.errorKey)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
