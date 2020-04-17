import {
  Box,
  Card,
  CardHeader,
  CircularProgress,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import RefreshIcon from "@material-ui/icons/Refresh";
import React from "react";
import { MatchesProps } from "../types";

export default function MatchesList(props: MatchesProps) {
  return (
    <Card>
      <CardHeader
        title="Matches"
        action={
          <IconButton>
            <RefreshIcon onClick={props.regenerateMatches} />
          </IconButton>
        }
      />
      {props.areMatchesGenerating ? (
        <Box justifyContent="center">
          <CircularProgress />
        </Box>
      ) : props.areMatchesValid ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Gifter</TableCell>
                <TableCell>Giftee</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.matches.map((match: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{match.gifter.name}</TableCell>
                  <TableCell>{match.giftee.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box textAlign="center" m={3}>
          {/* <Typography>{props.matchesMessage}</Typography> */}
        </Box>
      )}
    </Card>
  );
}
