import React, { useContext } from 'react'
import { CompetitionContext } from '../../../../../hooks/CompetitionContext';
import { useParams } from 'react-router-dom';
import ProblemSet from '../../subViews/ProblemSet';

const ProblemSetChallenge = () => {
    const {getProblems,getChallenge} = useContext(CompetitionContext)

    const {challengeID} = useParams();
    const problems = getProblems(challengeID);
    console.log("problems in: "+problems);
    const challenge = getChallenge(challengeID);
  return (
    <ProblemSet problems={problems} challenge={challenge}/>
    
  )
}

export default ProblemSetChallenge