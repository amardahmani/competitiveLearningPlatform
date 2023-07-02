import { Box } from '@mui/material'
import React, { useState } from 'react'

const ProblemsTable = () => {

  const [algorithmicQuestions,setAlgorithmicQuestions] = useState([]);

  

  return (
    <TableContainer>
        <Table aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}>
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
              return (
                <TableRow key={question._id}>
                  <TableCell>
                    <Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{question.title}</Typography>
                    
                    </TableCell>
                  <TableCell><Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{question.points}</Typography></TableCell>
                  <TableCell><Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{question.difficulty}</Typography></TableCell>
                  <TableCell>
                    <Box pl={2} alignItems="center">
                      <Button variant='outlined'>Solve</Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>

        </Table>
      </TableContainer>

  )
}

export default ProblemsTable