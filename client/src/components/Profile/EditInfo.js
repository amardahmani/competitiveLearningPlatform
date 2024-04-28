import { Box, Button, Card, CardActions, CardContent, Divider, TextField, Typography } from '@mui/material'
import React from 'react'

const EditInfo = () => {
  return (
    <Card variant='outlined'>
            <Box p={3}>
                <Typography variant='h3' align='center' color='primary'>EDIT INFORMATIONS</Typography>
            </Box>
            <Divider />
            <CardContent>
                <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    name="firstName"
                    fullWidth
                    sx={{
                    mb: 2,
                    }}
                />

                <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    name="lastName"
                    fullWidth
                    sx={{
                    mb: 2,
                    }}
                />

                <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
                    name="email"
                    fullWidth
                    sx={{
                    mb: 2,
                    }}
                />

                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    fullWidth
                    sx={{
                    mb: 2,
                    }}
                />

                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    name="username"
                    fullWidth
                    sx={{
                    mb: 2,
                    }}
                />
                </CardContent>
                <CardActions sx={{display:"flex"}}>
                    <Button variant='contained'> SAVE</Button>
                </CardActions>
        
        </Card>
  )
}

export default EditInfo