import { Box, Button, TableCell, TableContainer } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getAllAlgorithmic } from '../../../services/questions.service';
import ListAlgorithmic from '../../../components/questions/algorithmic/ListAlgorithmic';
import DeleteUpdateAlgorithmic from '../../../components/questions/algorithmic/Buttons/DeleteUpdateAlgorithmic';
import CreateAlgorithmic from '../../../components/questions/algorithmic/CreateAlgorithmic';
const QuestionManagement = () => {
    
    const [algorithmicQuestions,setAlgorithmicQuestions] = useState([]);
    
    const [open,setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
      const fetchData = async () =>{
        try{
          const response = await getAllAlgorithmic();
          setAlgorithmicQuestions(response.data)

        }catch(e){console.error(e);}
      };
      fetchData()
    },[])
    


    
  return (
    <Box>
        <Button variant='contained' onClick={handleOpen}>NEW QUESTION</Button>
        
        <CreateAlgorithmic 
        setAlgorithmicQuestions={setAlgorithmicQuestions}
        open={open}
        handleClose={handleClose}/>
        
        <ListAlgorithmic 
        setAlgorithmicQuestions={setAlgorithmicQuestions}
        algorithmicQuestions={algorithmicQuestions}
        DeleteUpdateAlgorithmic={DeleteUpdateAlgorithmic}/>
    </Box>
  )
}

export default QuestionManagement