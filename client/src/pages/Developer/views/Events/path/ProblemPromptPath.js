import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAlgorithmic } from '../../../../../services/questions.service';
import Problem from '../../subViews/Problem';

const ProblemPromptPath = () => {

    const {pathID,questionID} = useParams();

    const [problem,setProblem] = useState();
    
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await getAlgorithmic(questionID);
          setProblem(response.data);
          console.log(response.data);
        }
        catch(err){
          console.log(err);
        }
      };
      fetchData()
    },[])


  return (
    <>
      { problem && (
        <Problem
          problem={problem}
          event="Path"
          eventID={pathID} 
        />
      )}
    </>  
  )
}

export default ProblemPromptPath