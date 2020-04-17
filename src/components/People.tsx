import React, { useState } from "react";
import { PeopleProps, Person } from "../types";

export default function PeopleList(props: PeopleProps) {
  const [personInput, setPersonInput] = useState<Person>({
    name: "",
    household: props.households[0],
    gender: "None",
    age: 0,
  });
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  const onPersonInputNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPersonInput({
      ...personInput,
      name: event.target.value,
    });

    const trimmedName = event.target.value.trim();
    const isAddButtonDisabled =
      trimmedName === "" ||
      props.people.some((p) => p.name === trimmedName) ||
      trimmedName === undefined;

    setIsAddButtonDisabled(isAddButtonDisabled);
  };

  const onPersonInputKeyPress = (
    event: React.KeyboardEvent<HTMLDivElement | HTMLTextAreaElement>
  ) => {
    if (event.keyCode === 13) {
      const shouldAddPerson =
        personInput.name !== "" &&
        !props.people.some((p) => p.name === personInput.name) &&
        personInput.name !== undefined;

      if (shouldAddPerson) {
        event.preventDefault();
        onAddButtonClicked();
      }
    }
  };

  const onSelectedHouseholdChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const value = event.target.value as string;
    value.trim();

    if (value !== undefined && value !== "") {
      setPersonInput({
        ...personInput,
        household: value,
      });
    }
  };

  // const onSelectedGenderChange = (
  //   event: React.ChangeEvent<{ value: unknown }>
  // ) => {
  //   const value = event.target.value as string;
  //   value.trim();

  //   if (value !== undefined && value !== "") {
  //     setPersonInput({
  //       ...personInput,
  //       gender: value,
  //     });
  //   }
  // };

  const onAddButtonClicked = () => {
    props.addPerson(personInput);

    setPersonInput({
      name: "",
      household: props.households[0],
      gender: "None",
      age: 0,
    });

    setIsAddButtonDisabled(true);
  };

  return (
    <div></div>
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
