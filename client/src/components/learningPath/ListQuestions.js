import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'

const ListQuestions = () => {
    const problems = [
        {title:'aaaaaaaa'},
        {title:'aaaaaaaa'},
        {title:'aaaaaaaa'},
        {title:'aaaaaaaa'},
        {title:'aaaaaaaa'},
        {title:'aaaaaaaa'},
      ]
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
            {problems && problems.map((problem) => {
              return (
                <TableRow>
                  <TableCell>
                    <Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{problem.title}</Typography>
                    
                    </TableCell>
                  <TableCell><Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{problem.title}</Typography></TableCell>
                  <TableCell><Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{problem.title}</Typography></TableCell>
                  <TableCell>
                    <Box pl={2} alignItems="center">
                      <Button>Solve</Button>
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

export default ListQuestions