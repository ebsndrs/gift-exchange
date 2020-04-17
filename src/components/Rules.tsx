import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Switch,
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import HouseIcon from "@material-ui/icons/House";
import SyncIcon from "@material-ui/icons/Sync";
import WcIcon from "@material-ui/icons/Wc";
import React from "react";
import { RulesProps } from "../types";

export default function RulesList(props: RulesProps) {
  return (
    <List subheader={<ListSubheader>Rules</ListSubheader>}>
      {/* <ListItem>
        <ListItemIcon>
          <SyncIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-preventCircularGifting" primary="Prevent Circular Gifting" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={(event) => props.changeRule('preventCircularGifting', event.target.checked)}
            checked={props.rules.preventCircularGifting}
          />
        </ListItemSecondaryAction>
      </ListItem> */}
      <ListItem>
        <ListItemIcon>
          <HouseIcon />
        </ListItemIcon>
        <ListItemText
          id="switch-list-label-preventSameHousehold"
          primary="Prevent Same Household"
        />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={(event) =>
              props.changeRule("preventSameHousehold", event.target.checked)
            }
            checked={props.rules.preventSameHousehold}
          />
        </ListItemSecondaryAction>
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <WcIcon />
        </ListItemIcon>
        <ListItemText
          id="switch-list-label-preventSameGender"
          primary="Prevent Same Gender"
        />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={(event) =>
              props.changeRule("preventSameGender", event.target.checked)
            }
            checked={props.rules.preventSameGender}
          />
        </ListItemSecondaryAction>
      </ListItem>
      {/* <ListItem>
        <ListItemIcon>
          <DateRangeIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-preventSameAgeGroup" primary="Prevent Same Age Group" />
        <ListItemSecondaryAction>
          <Switch
            edge="end"
            onChange={(event) => props.changeRule('preventSameAgeGroup', event.target.checked)}
            checked={props.rules.preventSameAgeGroup}
          />
        </ListItemSecondaryAction>
      </ListItem> */}
    </List>
  );
}
