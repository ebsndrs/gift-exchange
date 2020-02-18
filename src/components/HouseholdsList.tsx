import { Button, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, TextField } from '@material-ui/core';
import HouseIcon from '@material-ui/icons/House';
import React, { useState } from 'react';
import HouseholdsListProps from '../interfaces/HouseholdsListProps';

export default function HouseholdsList(props: HouseholdsListProps) {
  const [householdInput, setHouseholdInput] = useState('');
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(true);

  const onHouseholdInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setHouseholdInput(event.target.value);

    const trimmedHousehold = event.target.value.trim();
    const isAddButtonDisabled = trimmedHousehold === '' ||
      props.households.some(h => h === trimmedHousehold) ||
      trimmedHousehold === undefined;

    setIsAddButtonDisabled(isAddButtonDisabled);
  }

  const onHouseholdInputKeyPress = (event: React.KeyboardEvent<HTMLDivElement | HTMLTextAreaElement>) => {
    if (event.keyCode === 13) {
      const shouldAddHousehold = householdInput !== '' &&
        !props.households.some(h => h === householdInput) &&
        householdInput !== undefined;
      if (shouldAddHousehold) {
        event.preventDefault();
        onAddButtonClicked();
      }
    }
  }

  const onAddButtonClicked = () => {
    props.addHousehold(householdInput);
    setHouseholdInput('');
    setIsAddButtonDisabled(true);
  }

  return (
    <List subheader={<ListSubheader>Households</ListSubheader>}>
      <ListItem>
        <ListItemText>
          <TextField
            label="Add Household"
            onChange={(event) => onHouseholdInputChange(event)}
            onKeyUp={(event) => onHouseholdInputKeyPress(event)}
            value={householdInput}
          // error={households.includes(householdInput)}
          // helperText={households.includes(householdInput) ? "That household already exists" : ""}
          />
        </ListItemText>
        <ListItemSecondaryAction>
          <Button
            disabled={isAddButtonDisabled}
            variant="contained"
            color="primary"
            onClick={onAddButtonClicked}
          >
            Add
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      {props.households.filter(household => household !== props.households[0]).map(household =>
        <ListItem key={household}>
          <ListItemIcon>
            <HouseIcon />
          </ListItemIcon>
          <ListItemText primary={household} />
          <ListItemSecondaryAction>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => props.removeHousehold(household)}
            >
              Remove
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
      )}
    </List>
  );
}