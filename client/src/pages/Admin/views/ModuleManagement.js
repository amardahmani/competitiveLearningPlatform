import { Box, Button, Card } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react'
import CreateModule from '../../../components/module/CreateModule';
import ModuleCard from '../../../components/module/ModuleCard';
import UpdateDeleteButtons from '../../../components/module/UpdateDeleteButtons';
import EditModule from '../../../components/module/EditModule';
import {useParams} from 'react-router-dom';
import { getModules } from '../../../services/module.service';
import { getInstructors, getNonInstructors, pushInstructor, removeInstructor } from '../../../services/path.service';
import Instructors from '../../../components/tables/Instructors';
import AddInstructor from '../../../components/learningPath/AddInstructors';
import AddInstructorDialog from '../../../components/users/AddInstructorDialog';
const ModuleManagementAdmin = () => {

    const [modules,setModules] = useState([]);
    const [open,setOpen] = useState(false);
    const [openCreate,setOpenCreate] = useState(false);
    const params = useParams();
    const [instructors,setInstructors] = useState([]);
    const [savedInstructors,setSavedInstructors] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch non-instructor users
          const nonInstructorsResponse = await getNonInstructors(params.pathID);
          const nonInstructors = nonInstructorsResponse.data;
    
          // Fetch modules
          const modulesResponse = await getModules(params.pathID);
          const modules = modulesResponse.data.modules;
          
          const savedInstructorsResponse = await getInstructors(params.pathID);
          const savedInstructors = savedInstructorsResponse.data;
          // Update state with fetched data
          setInstructors(nonInstructors);
          setModules(modules);
          setSavedInstructors(savedInstructors);
        } catch (err) {
          console.log(err);
        }
      };
    
      fetchData();
    }, [params.pathID]);
    


    const handleSave = (instructor) => {
      const instructorId = instructor._id;
      const pathID = params.pathID;
      pushInstructor(pathID,instructorId).then((response) => {
        console.log(response);
        setInstructors((prevInstructors) =>
        prevInstructors.filter((prevInstructor) => prevInstructor._id !== instructor._id)
      );
      }).catch((err) => {
        console.log(err);
      })

      setSavedInstructors((prevInstructors) => [...prevInstructors, instructor]);
    }

    const handleDelete = (instructor) => {
      const pathId = params.pathID;
      const instructorId = instructor._id;
    
      removeInstructor(pathId, instructorId)
        .then((response) => {
          console.log(response);
    
          // Remove the instructor from the savedInstructors array
          setSavedInstructors((prevInstructors) =>
            prevInstructors.filter((prevInstructor) => prevInstructor._id !== instructor._id)
          );
        })
        .catch((error) => {
          console.log(error);
        });

        setInstructors((prevInstructors) => [...prevInstructors, instructor]);

    };
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const handleOpenCreate = () => {
      setOpenCreate(true);
    }
    const handleCloseCreate = () => {
      setOpenCreate(false);
    }
  return (
    <Box>
        <Button onClick={handleOpen} variant="outlined">new Module</Button>
        <CreateModule open={open} handleClose={handleClose} pathID={params.pathID}/>

        <Box display='flex' flexDirection='column'>
          <Box flex='1'>
            
          {modules && modules.map((module) => (
            <ModuleCard key={module._id} 
            title={module.title}
            buttonDescription={module.description}
            moduleID={module._id}
            buttons={UpdateDeleteButtons} />
          ))}
          </Box>
          <Box flex='1'>
            <EditModule />
            <Card width="100%">
              <Button variant='contained' onClick={handleOpenCreate}>Add a new instructor</Button>
              <Instructors instructors={savedInstructors} nonInstructors={instructors}
              handleDelete={handleDelete}/>
              <AddInstructorDialog open={openCreate} 
              instructors={savedInstructors} 
              nonInstructors={instructors}
              handleClose={handleCloseCreate}
              handleSave={handleSave}
              />
            </Card>           
            
          </Box>
        </Box>
    </Box>
  )
}



export default ModuleManagementAdmin