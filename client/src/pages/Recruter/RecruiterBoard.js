import React from 'react'
import SideBar from '../../components/navigation/SideBar'
import { Outlet } from 'react-router-dom'
import { Box, Container, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import Sidebar from '../../components/navigation/SideBar'
import Header from '../../components/navigation/Header'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import QuizIcon from '@mui/icons-material/Quiz';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CallIcon from '@mui/icons-material/Call';
import DashboardIcon from '@mui/icons-material/Dashboard';
import WorkIcon from '@mui/icons-material/Work';
import JobsProvider from '../../hooks/JobsContext'

const RecruiterBoard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const Menuitems  = [
    {
      title:"dashboard",
      href:"/recruiter/dashboard",
      icon:DashboardIcon
    },
    {
      title:"challenges",
      href:"/recruiter/challenge",
      icon:EmojiEventsIcon
    },
    {
      title:"jobs",
      href:"/recruiter/jobs",
      icon:WorkIcon
    },
    {
      title:"interview a candidate",
      href:"/recruiter/interview",
      icon:CallIcon
    },
    {
      title:"profile",
      href:"/instructor/profile",
      icon:AccountCircleIcon
    }
  ]

  return (
    <Box sx={{display:"flex",minHeight:"100vh",overflow:"hidden",width:"100%"}}>
      
      <Header
        sx={{
          paddingLeft: isSidebarOpen && lgUp ? "265px" : "",
          backgroundColor: "#ffffff",
        }}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        toggleMobileSidebar={() => setMobileSidebarOpen(true)}
      />
      
      <Sidebar
        Menuitems ={Menuitems }
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />

      <Box sx={{
      display: "flex",
      flex: "1 1 auto",
      overflow: "hidden",
      backgroundColor: (theme) => theme.palette.background.default,
      paddingTop: {
        
        xs: "64px",
      },
    }}>
        <Container
        maxWidth={false}
        sx={{
          paddingTop: "20px",
          paddingLeft: isSidebarOpen && lgUp ? "280px!important" : "",
        }}>
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>
            <JobsProvider>
            <Outlet />
            </JobsProvider>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default RecruiterBoard;