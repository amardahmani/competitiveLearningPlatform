import { Avatar, Box, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from '@mui/material'
import React, { useState } from 'react'
import problemSolving from '../../assets/project-management.png'
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate } from 'react-router-dom';
const PathCard = (props) => {
    const {title,description,pathID,image,MoreUD,setPaths,PathCardDeveloper,LearnMore} = props;
    const fileUrl = `http://localhost:3001/uploads/poster/${image}`;
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
                    {/* I want to display it in here  */}
                    {MoreUD && (
            /* Display the MoreUD component if it's passed as a prop */
                            <MoreUD title={title} description={description} pathID={pathID} setPaths={setPaths} />
                        )}
                    
                </Box>
                {LearnMore && (<LearnMore pathID={pathID} setPaths={setPaths}/>)}
                {PathCardDeveloper && <PathCardDeveloper pathID={pathID}/>}
            </CardContent>
            
            
        </Card>
    
  )
}

export default PathCard