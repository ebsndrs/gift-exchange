import React from 'react';
import { MatchesProps } from '../types';
import { getPermutation } from '../matching';

export default function Matches(props: MatchesProps) {
  let temp = [
    ...new Set(
      props.matches.map((x) =>
        x.map((y) => y.giver.name + ' gives to ' + y.receiver.name).toString()
      )
    ),
  ];

  let temp2 = temp.map((x) => x.split(','));

  return (
    <div className="flex mx-64">
      <div>
        <h1 className="font-bold">All Matches</h1>
        {props.matches.map((x, index) => (
          <div className="mb-4">
            <h1 className="font-bold">Permutation {index}</h1>
            {x.map((y) => (
              <div>{y.giver.name + ' gives to ' + y.receiver.name}</div>
            ))}
          </div>
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
