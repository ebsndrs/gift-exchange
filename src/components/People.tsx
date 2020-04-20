import React, { useState } from 'react';
import { PeopleProps, Person } from '../types';

export default function People(props: PeopleProps) {
  const [person, setPerson] = useState<Person>({
    name: '',
    household: '',
  });
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPerson({
      ...person,
      name: event.target.value,
    });

    const trimmedName = event.target.value.trim();
    const isAddButtonDisabled =
      trimmedName === '' || props.people.some((p) => p.name === trimmedName) || trimmedName === undefined;

    setIsAddButtonDisabled(isAddButtonDisabled);
  };

  const onInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('Event');

    if (event.charCode === 13) {
      const shouldAddPerson =
        person.name !== '' && !props.people.some((p) => p.name === person.name) && person.name !== undefined;

      if (shouldAddPerson) {
        event.preventDefault();
        onAddButtonClicked();
        document.getElementById('name')?.focus();
      }
    }
  };

  const onHouseholdChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPerson({
      ...person,
      household: event.target.value,
    });
  };

  const onAddButtonClicked = () => {
    props.addPerson(person);

    setPerson({
      name: '',
      household: '',
    });

    setIsAddButtonDisabled(true);
  };

  const households = [...new Set(props.people.map((person) => person.household))];

  return (
    <div className="mx-2 my-4 bg-white overflow-hidden shadow rounded-lg">
      <div className="border-b border-gray-200 px-4 py-5 sm:px-6 flex justify-between items-center">
        <div>
          <h1 className="text-lg leading-6 font-medium text-gray-900">Participants</h1>
        </div>
        <div>
          <span className="inline-flex rounded-full shadow-sm">
            <button
              title="Upload people"
              type="button"
              className="inline-flex items-center p-1 border border-gray-300 text-xs leading-4 font-medium rounded-full text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </span>
          <span className="ml-2 inline-flex rounded-full shadow-sm">
            <button
              onClick={props.resetPeople}
              title="Reset people"
              type="button"
              className="inline-flex items-center p-1 border border-gray-300 text-xs leading-4 font-medium rounded-full text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
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
      <div className="px-4 py-5 sm:p-6">
        <div className="mt-6 grid grid-cols-1 row-gap-6 col-gap-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="name" className="sr-only">
              Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                value={person.name}
                onChange={(e) => onNameChange(e)}
                onKeyPress={(e) => onInputKeyPress(e)}
                id="name"
                className="form-input block w-full sm:text-sm sm:leading-5"
                placeholder="Name"
              />
            </div>
          </div>
          <div className="sm:col-span-3">
            <label htmlFor="household" className="sr-only">
              Household
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                value={person.household}
                onChange={(e) => onHouseholdChange(e)}
                onKeyPress={(e) => onInputKeyPress(e)}
                id="household"
                list="households"
                className="form-input block w-full sm:text-sm sm:leading-5"
                placeholder="Household"
              />
              <datalist id="households">
                {households.map((household) => (
                  <option value={household} />
                ))}
              </datalist>
            </div>
          </div>
          {/* <span className="ml-2 inline-flex rounded-full shadow-sm">
            <button
              onClick={() => props.addPerson(person)}
              disabled={isAddButtonDisabled}
              title="Add person"
              type="button"
              className="inline-flex items-center p-1 border border-gray-300 text-xs leading-4 font-medium rounded-full text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
            >
              <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </span> */}
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
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                      Household
                    </th>
                    <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                  </tr>
                </thead>
                <tbody>
                  {props.people.map((person) => (
                    <tr className="bg-white">
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium text-gray-900">
                        {person.name}
                      </td>
                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-500">
                        {person.household}
                      </td>
                      <td className="text-right pr-6">
                        <span className="ml-2 inline-flex rounded-full shadow-sm">
                          <button
                            onClick={() => props.removePerson(person.name)}
                            title="Remove person"
                            type="button"
                            className="inline-flex items-center p-1 border border-gray-300 text-xs leading-4 font-medium rounded-full text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:text-gray-800 active:bg-gray-50 transition ease-in-out duration-150"
                          >
                            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <Card>
    //   <CardHeader
    //     title="People"
    //     action={
    //       <IconButton>
    //         <ClearIcon onClick={props.resetPeople} />
    //       </IconButton>
    //     }
    //   />
    //   <CardContent>
    //     <TableContainer>
    //       <Table>
    //         <TableHead>
    //           <TableRow>
    //             <TableCell style={{ width: "30%" }}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id="personInputName"
    //                   placeholder="Name"
    //                   label="Name"
    //                   value={personInput.name}
    //                   onChange={(event) => onPersonInputNameChange(event)}
    //                   onKeyUp={(event) => onPersonInputKeyPress(event)}
    //                 />
    //               </FormControl>
    //             </TableCell>
    //             <TableCell>
    //               <FormControl fullWidth>
    //                 <InputLabel>Household</InputLabel>
    //                 <Select
    //                   id="personInputHousehold"
    //                   value={personInput.household}
    //                   onChange={(
    //                     event: React.ChangeEvent<{ value: unknown }>
    //                   ) => onSelectedHouseholdChange(event)}
    //                 >
    //                   {props.households.map((household) => (
    //                     <MenuItem key={household} value={household}>
    //                       {household}
    //                     </MenuItem>
    //                   ))}
    //                 </Select>
    //               </FormControl>
    //             </TableCell>
    //             <TableCell>
    //               <FormControl fullWidth>
    //                 <InputLabel>Gender</InputLabel>
    //                 <Select
    //                   id="personInputGender"
    //                   value={personInput.gender}
    //                   // onChange={(
    //                   //   event: React.ChangeEvent<{ value: unknown }>
    //                   // ) => onSelectedGenderChange(event)}
    //                 >
    //                   {props.genders.map((gender) => (
    //                     <MenuItem key={gender} value={gender}>
    //                       {gender}
    //                     </MenuItem>
    //                   ))}
    //                 </Select>
    //               </FormControl>
    //             </TableCell>
    //             <TableCell style={{ width: "11%" }}>
    //               <FormControl fullWidth>
    //                 <TextField
    //                   id="personInputAge"
    //                   type="number"
    //                   placeholder="Age"
    //                   label="Age"
    //                   value={personInput.age}
    //                   inputProps={{ min: "1" }}
    //                 />
    //               </FormControl>
    //             </TableCell>
    //             <TableCell>
    //               <Button
    //                 fullWidth
    //                 variant="contained"
    //                 color="primary"
    //                 onClick={onAddButtonClicked}
    //                 disabled={isAddButtonDisabled}
    //               >
    //                 Add
    //               </Button>
    //             </TableCell>
    //           </TableRow>
    //           <TableRow>
    //             <TableCell>Name</TableCell>
    //             <TableCell>Household</TableCell>
    //             <TableCell>Gender</TableCell>
    //             <TableCell>Age</TableCell>
    //             <TableCell></TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {props.people.map((person) => (
    //             <TableRow key={person.name}>
    //               <TableCell>{person.name}</TableCell>
    //               <TableCell>{person.household}</TableCell>
    //               <TableCell>{person.gender}</TableCell>
    //               <TableCell>{person.age > 0 ? person.age : "None"}</TableCell>
    //               <TableCell>
    //                 <Button
    //                   fullWidth
    //                   variant="contained"
    //                   color="secondary"
    //                   onClick={() => props.removePerson(person.name)}
    //                 >
    //                   Remove
    //                 </Button>
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </CardContent>
    // </Card>
  );
}
