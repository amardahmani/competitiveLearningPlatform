import { Box, CssBaseline } from '@mui/material'
import React from 'react'
import Navbar from '../../components/navigation/Navbar'
import { Outlet } from 'react-router-dom';
import CompetitionProvider from '../../hooks/CompetitionContext';

const DeveloperBoard = () => {
  

  
  return (
    <Box sx={{backgroundColor: (theme) =>
      `${theme.palette.primary.light}!important`,
  }}>
    <CssBaseline />
    <Box
        sx={{
          minHeight: '100vh', // Adjusted to use viewport height
          minWidth: '100%',
          overflow: 'hidden',
        }}
      >
        
        <Navbar />
        <CompetitionProvider>
        <Outlet />
        </CompetitionProvider>
      </Box>
    </Box>
  )
}

export default DeveloperBoard