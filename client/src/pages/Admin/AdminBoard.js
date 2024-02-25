import React from 'react'
import SideBar from '../../components/navigation/SideBar'
import { Outlet } from 'react-router-dom'
import { Box, Container, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import Sidebar from '../../components/navigation/SideBar'
import Header from '../../components/navigation/Header'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RouteIcon from '@mui/icons-material/Route';
import PeopleIcon from '@mui/icons-material/People';
const AdminBoard = () => {

    const [user,setUser] = useState("");

    const Menuitems = [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: DashboardIcon,
      },
      {
        title: "plannification",
        href: "/admin/plan",
        icon: CalendarMonthIcon,
      },
      {
        title: "User Management",
        href: "/admin/users",
        icon: PeopleIcon,
      },
      {
        title: "Path Management",
        href: "/admin/path",
        icon: RouteIcon,
      },
      {
        title: "profile",
        href: "/admin/profile",
        icon: AccountCircleIcon,
      }
    ];

    const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
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
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
        Menuitems={Menuitems}
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
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Box>
  )
  
}

export default AdminBoard