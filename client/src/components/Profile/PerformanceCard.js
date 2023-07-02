import { Box, Card, CardContent, CircularProgress, Typography } from '@mui/material'
import React from 'react'

const PerformanceCard = () => {
  return (
    <Box width="25%">
        <Card sx={{padding:"1rem 0"}}>
            <CardContent sx={{display:"flex",flexDirection:"column",alignItems:"center"}}>
                <Typography variant="h5">Your performance</Typography>
                <Box sx={{display:"flex"}}>
                <Box sx={{position:'relative'}} mt={4} mb={3}>
                    <CircularProgress
                        variant="determinate"
                        size="4rem"
                        thickness={5}
                        value={50}
                    />
                    <Typography
                    variant="h6"
                    component="div"
                    style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    }}
                    >
                    50%
                    </Typography>
                </Box>
                </Box>
                <Typography variant='p' textAlign='center'>Questions   solved 266</Typography>
                <Typography variant='p' textAlign='center'>Points    200xp</Typography>
            </CardContent>
        </Card>
    </Box>
  )
}

export default PerformanceCard