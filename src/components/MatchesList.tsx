import { Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React from 'react';
import MatchesListProps from '../interfaces/MatchesListProps';

export default function MatchesList(props: MatchesListProps) {
  return (
    <Card>
      <CardHeader title="Matches" />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Gifter</TableCell>
              <TableCell>Giftee</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.matches.map((match, index) =>
              <TableRow key={index}>
                <TableCell>{match.gifter.name}</TableCell>
                <TableCell>{match.giftee.name}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}