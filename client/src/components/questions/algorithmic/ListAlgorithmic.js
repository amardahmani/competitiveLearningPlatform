import { Box, Dialog, DialogContent,Select ,DialogTitle, Modal, TextField,Button, InputLabel, Typography, Table, TableContainer, TableRow, TableCell, TableHead, TableBody, FormControl, MenuItem, Link } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';


const ListAlgorithmic = (props) => {
  const {algorithmicQuestions} = props;
  
  
  return (
    <Box> {/* Render the passed component if provided */}

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
                      <Button color='danger'><DeleteIcon /></Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>

        </Table>
      </TableContainer>

    </Box>
  )
}

export default ListAlgorithmic