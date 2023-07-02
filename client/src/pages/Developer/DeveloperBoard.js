import { Box, Container, Grid, OutlinedInput, Table } from '@mui/material'
import React from 'react'
import Navbar from '../../components/navigation/Navbar'
import PathCard from '../../components/learningPath/PathCard';
import Header from '../../components/header/header';
import { Outlet } from 'react-router-dom';

const DeveloperBoard = () => {
  

  const learningPaths = [

  ];
  
  return (
    <Box sx={{backgroundColor: (theme) =>
      `${theme.palette.primary.light}!important`,
  }}>
        <Navbar />
        <Outlet />
    </Box>
  )
}

export default DeveloperBoard