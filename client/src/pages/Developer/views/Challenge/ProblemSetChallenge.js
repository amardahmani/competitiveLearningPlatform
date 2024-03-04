import React, { useContext } from 'react'
import { CompetitionContext } from '../../../../hooks/CompetitionContext';
import { useSearchParams } from 'react-router-dom';
import ProblemSet from '../subViews/ProblemSet';

const ProblemSetChallenge = () => {
    const {getProblems,getChallenge} = useContext(CompetitionContext)

    const {challengeID} = useSearchParams();
    const problems = getProblems(challengeID);
    const challenge = getChallenge(challengeID);
  return (
    <ProblemSet problems={problems} challenge={challenge}/>
    
  )
}

export default ProblemSetChallenge