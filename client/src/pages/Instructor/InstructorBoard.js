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
import RouteIcon from '@mui/icons-material/Route';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChallengesProvider from '../../hooks/ChallengesContext'

const InstructorBoard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const Menuitems  = [
    {
      title:"dashboard",
      href:"/instructor/dashboard",
      icon:DashboardIcon
    },
    {
      title:"challenges",
      href:"/instructor/challenge",
      icon:EmojiEventsIcon
    },
    {
      title:"learning path",
      href:"/instructor/path",
      icon:RouteIcon
    },
    {
      title:"questions",
      href:"/instructor/questions",
      icon:QuizIcon
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
            <ChallengesProvider>
            <Outlet />
            </ChallengesProvider>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

export default InstructorBoard