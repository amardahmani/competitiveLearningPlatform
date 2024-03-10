import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CompetitionContext } from '../../../../../hooks/CompetitionContext';
import Problem from '../../subViews/Problem';
import { getAlgorithmic } from '../../../../../services/questions.service';


const ProblemPromptChallenge = () => {


    const {questionID,challengeID} = useParams();

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
          event="Challenge"
          eventID={challengeID} 
        />
      )}
    </>  
      
    )  
}

export default ProblemPromptChallenge;