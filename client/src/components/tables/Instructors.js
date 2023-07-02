
import { Box, Dialog, DialogContent,Select ,DialogTitle, Modal, TextField,Button, InputLabel, Typography, Table, TableContainer, TableRow, TableCell, TableHead, TableBody, FormControl, MenuItem, Link } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';


const Instructors = (props) => {
    const {instructors,nonInstructors,handleDelete} = props;
    console.log(instructors)
    
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
            <TableCell>username</TableCell>
            <TableCell>firstName</TableCell>
            <TableCell>lastName</TableCell>
            <TableCell>email</TableCell>
            <TableCell>action</TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {instructors && instructors.map((instructor) => {
              return (
                <TableRow key={instructor._id}>
                  <TableCell>
                    <Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{instructor.username}</Typography>
                    
                    </TableCell>
                  <TableCell><Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{instructor.firstName}</Typography></TableCell>
                  <TableCell><Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{instructor.lastName}</Typography></TableCell>
                <TableCell><Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{instructor.email}</Typography></TableCell>
                  <TableCell><Typography sx={{
                  fontSize: "15px",
                  fontWeight: "500",
                }}>{instructor.email}</Typography></TableCell>
                  <TableCell>
                    <Box pl={2} alignItems="center">
                      <Button color='danger' onClick={() => handleDelete(instructor)}><DeleteIcon /></Button>
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

export default Instructors