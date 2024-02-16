import { Box,Typography, Table, TableContainer, TableRow, TableCell, TableHead, TableBody} from '@mui/material';
import React from 'react'
import { getCurrentUser } from '../../../services/auth.service';


const ListAlgorithmic = (props) => {
  const {algorithmicQuestions,setAlgorithmicQuestions,DeleteUpdateAlgorithmic,DropAlgorithmic,
  challengeID,handleDropAlgorithmic} = props;
  
  const currentUser = getCurrentUser();


  return (
    <Box>
      <TableContainer>
        <Table aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Points</TableCell>
              <TableCell>Difficulty</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {algorithmicQuestions && algorithmicQuestions.map((question) => {
              const isCurrentUserCreator = currentUser && currentUser.id === question.creator;
              return (
                <TableRow key={question._id}>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{question.title}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{question.points}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>{question.difficulty}</Typography>
                  </TableCell>
                  <TableCell>
                    {isCurrentUserCreator && (
                      <DeleteUpdateAlgorithmic
                        algorithmicQuestions={algorithmicQuestions}
                        setAlgorithmicQuestions={setAlgorithmicQuestions}
                        questionID={question._id}
                      />
                    )}
                    {DropAlgorithmic && (
                      <DropAlgorithmic questionID={question._id} 
                      eventID={challengeID}
                      handleDropAlgorithmic={handleDropAlgorithmic}/>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ListAlgorithmic