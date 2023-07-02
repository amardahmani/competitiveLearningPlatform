import React from 'react'
import { useState } from "react";
import { Box, Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const PathBar = () => {
    const [activeIndex, setActiveIndex] = useState(-1);

    const handleClick = (index) => {
      if (activeIndex === index) {
        setActiveIndex(-1);
      } else {
        setActiveIndex(index);
      }
    };
  
    return (
      <Box sx={{ maxWidth: 350, margin: "100px auto 20px", borderRadius: 8, overflow: "hidden" }}>
        <List>
          <ListItem disablePadding sx={{ display:"flex",flexDirection:"column" }}>
            <ListItemButton onClick={() => handleClick(0)} sx={{ py: 2 }}>
              
              <ListItemText primary="Python" sx={{ color: activeIndex === 0 ? "#fff" : "#999999" }} />
              <ExpandMoreIcon sx={{ color: "#999999", ml: "auto", transform: activeIndex === 0 ? "rotate(180deg)" : "rotate(0deg)" }} />
            </ListItemButton>
            <Collapse in={activeIndex === 0} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{display:"flex",flexDirection:"column"}}>
                <ListItemButton sx={{ py: 1 }}>
                  <ListItemText primary="Python Level 1" sx={{ color: "#66b2ff", pl: 3 }} />
                </ListItemButton>
                <ListItemButton sx={{ py: 1 }}>
                  <ListItemText primary="Python Level 2" sx={{ color: "#66b2ff", pl: 3 }} />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleClick(1)} sx={{ py: 2 }}>
              
              <ListItemText primary="Node-JS" sx={{ color: activeIndex === 1 ? "#fff" : "#999999" }} />
              <ExpandMoreIcon sx={{ color: "#999999", ml: "auto", transform: activeIndex === 1 ? "rotate(180deg)" : "rotate(0deg)" }} />
            </ListItemButton>
            <Collapse in={activeIndex === 1} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ py: 1 }}>
                  <ListItemText primary="Node-JS Level 1" sx={{ color: "#66b2ff", pl: 3 }} />
                </ListItemButton>
                <ListItemButton sx={{ py: 1 }}>
                  <ListItemText primary="Node-JS Level 2" sx={{ color: "#66b2ff", pl: 3 }} />
                </ListItemButton>
                <ListItemButton sx={{ py: 1 }}>
                  <ListItemText primary="Node-JS Level 3" sx={{ color: "#66b2ff", pl: 3 }} />
                </ListItemButton>
              </List>
            </Collapse>
          </ListItem>
        </List>
        </Box>      
    )
}

export default PathBar