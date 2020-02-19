import { Box, Card, CardHeader, CircularProgress, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React from 'react';
import MatchesListProps from '../interfaces/MatchesListProps';

export default function MatchesList(props: MatchesListProps) {
  return (
    <Card>
      <CardHeader title="Matches" />
      {props.areMatchesGenerating ?
        (
          <Box justifyContent="center">
            <CircularProgress />
          </Box>
        ) :
        (
          props.areMatchesValid ?
            (
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
            ) :
            (
              <Box textAlign="center" m={3}>
                <Typography>{props.matchesMessage}</Typography>
              </Box>
            )
        )}
    </Card>
  );
}