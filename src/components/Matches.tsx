import React from 'react';
import { MatchesProps } from '../types';

export default function Matches(props: MatchesProps) {
  return (
    <div>
      <div>
        <h1 className="font-bold">All Matches</h1>
        <button onClick={props.regenerateMatches}>Regenerate</button>
        {props.matches.map((match) => (
          <div>{match.giver.name + ' gives to ' + match.receiver.name}</div>
        ))}
      </div>
    </div>
    // <Card>
    //   <CardHeader
    //     title="Matches"
    //     action={
    //       <IconButton>
    //         <RefreshIcon onClick={props.regenerateMatches} />
    //       </IconButton>
    //     }
    //   />
    //   {props.areMatchesGenerating ? (
    //     <Box justifyContent="center">
    //       <CircularProgress />
    //     </Box>
    //   ) : props.areMatchesValid ? (
    //     <TableContainer>
    //       <Table>
    //         <TableHead>
    //           <TableRow>
    //             <TableCell>Gifter</TableCell>
    //             <TableCell>Giftee</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {props.matches.map((match: any, index: any) => (
    //             <TableRow key={index}>
    //               <TableCell>{match.gifter.name}</TableCell>
    //               <TableCell>{match.giftee.name}</TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   ) : (
    //     <Box textAlign="center" m={3}>
    //       {/* <Typography>{props.matchesMessage}</Typography> */}
    //     </Box>
    //   )}
    // </Card>
  );
}
