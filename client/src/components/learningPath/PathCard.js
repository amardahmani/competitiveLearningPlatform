import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from '@mui/material'
import React, { useState } from 'react'
import problemSolving from '../../assets/project-management.png'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
const PathCard = (props) => {
    const { buttons: ButtonsComponent } = props;
    const {title,description,pathID,image} = props;
    const fileUrl = `http://localhost:3001/uploads/poster/${image}`;
    const {actions: ActionsComponent} = props;
    const [showMore, setShowMore] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(pathID)
    }
  
    return (
    
        <Card sx={{'&': {
            paddingBottom: '0', // set the color of the last child to red
            },}}>
                
            <CardContent width="100%"sx={{'&:last-child': { pb: 0 },p:"0"}} >
                <Box sx={{display:"flex",justifyContent:"space-between"}} p={2}>
                    <Box>
                        <Avatar src={fileUrl}/>
                    </Box>
                    <Box p={2} mr={3}>
                        <Typography variant='h4' mb={2}>{title}</Typography>
                        <Typography variant='span'>{showMore ? description : `${description.substring(0, 100)}`}</Typography>
                    </Box>
                    {ButtonsComponent && <ButtonsComponent 
                    title={title}
                    description={description}
                    pathID={pathID}/>} {/* Render the passed component if provided */}
                    
                </Box>
                {ActionsComponent && <ActionsComponent 
                pathID={pathID}/>}
            </CardContent>
            
        </Card>
    
  )
}

export default PathCard