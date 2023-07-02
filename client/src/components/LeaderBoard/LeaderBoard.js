import { Button, Paper,Box, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar, useMediaQuery, TableContainer, Table, Typography } from '@mui/material'
import React from 'react'
import SearchIcon from '@mui/icons-material/Search';




const LeaderBoard = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const rankings = [
        {name:"and", rank:"1" ,country:"ALG",rating:"1222"},
        {name:"and",rank:"1",country:"ALG",rating:"1222"},
        {name:"and",rank:"1",country:"ALG",rating:"1222"},
        {name:"and",rank:"1",country:"ALG",rating:"1222"}
    ]

  return (
    <>
        <Box sx={{ml:"10px"}} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Box 
            display="grid"
            gap="20px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 1" },
                mb:"40px",
                mt:"30px",
              }}
            >
            
            <TextField 
            label="Username"
            name='username'
            size='small'
            />
            <TextField 
            label="University"
            name='university'
            size='small'
            />
            <TextField 
            label="country"
            name='country'
            size='small'
            />

            <Button color='primary' variant='outlined'>Filter <SearchIcon /></Button>

            </Box>
            <TableContainer 
            sx={{mt:"30px",width:"90%"}}>
            <Table sx={{borderCollapse:"separate",borderSpacing:"0px 15px"}}>
            <TableHead sx={{background:"#f3f4f7"}}>
                <TableRow>
                    <TableCell><Typography >NAME</Typography></TableCell>
                    <TableCell align='center'><Typography>RANK</Typography></TableCell>
                    <TableCell align='center'><Typography>COUNTRY</Typography> </TableCell>
                    <TableCell align='center'><Typography>RATING</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {rankings && rankings.map((ranking) => {
                    return (
                        <TableRow>
                            <TableCell><Typography variant="p" sx={{fontWeight:"500",fontSize:"16px"}}>{ranking.name}</Typography></TableCell>
                            <TableCell align='center'><Typography variant="p" sx={{fontWeight:"500",fontSize:"16px"}}>{ranking.rank}</Typography></TableCell>
                            <TableCell align='center'><Typography variant="p" sx={{fontWeight:"500",fontSize:"16px"}}>{ranking.country}</Typography></TableCell>
                            <TableCell align='center'>
                                <Typography variant="p" sx={{mr:"10px",fontWeight:"500",fontSize:"16px"}}>{ranking.rating}</Typography></TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
            </Table>
            </TableContainer>
        </Box>
    </>
  )
}

export default LeaderBoard