import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const ListTutorials = ({tutorials}) => {
  return (
    <TableContainer>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>
            TITLE
          </TableCell>
          <TableCell>
            ACTIONS
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tutorials && tutorials.map((tutorial) => (
          <TableRow key={tutorial._id}>
            <TableCell>{tutorial.title}</TableCell>
            {TutorialUpdateDelete && (
                  <TutorialUpdateDelete  
                  tutorial={tutorial}
                  moduleID={moduleID}
                  setTutorials={setTutorials}/>
              )}
            {ViewTutorial && (
              <ViewTutorial tutorial={tutorial}/>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
   </TableContainer>
  )
}

export default ListTutorials