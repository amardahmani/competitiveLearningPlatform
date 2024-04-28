import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Divider, TextField, Typography } from '@mui/material'
import React from 'react'
import profilePic from '../../../assets/8.jpg';
import PerformanceCard from '../../../components/Profile/PerformanceCard';
import EditInfo from '../../../components/Profile/EditInfo';
import InfoCard from '../../../components/Profile/InfoCard';

const ProfileDeveloper = () => {
  return (
    <Box display="flex">
        
        <Box maxHeight={100}>
        <InfoCard />
        </Box>
        
        <PerformanceCard />
        <EditInfo />
        
    </Box>
  )
}

export default ProfileDeveloper