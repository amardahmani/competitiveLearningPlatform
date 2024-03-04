import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CompetitionContext } from '../../../../hooks/CompetitionContext';
import Problem from '../subViews/Problem';

const ProblemPromptChallenge = () => {

    const {getProblem} = useContext(CompetitionContext)
    const {questionID,challengeID} = useParams();

    const problem = getProblem(challengeID,questionID);

    
    return (
      <Problem problem/>
  ) 
}

export default ProblemPromptChallenge;