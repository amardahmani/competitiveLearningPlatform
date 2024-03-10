import React, { createContext, useState, useEffect } from 'react';
import { getPlannedChallenges } from '../services/challenge.service';
import { useParams } from 'react-router-dom';

export const CompetitionContext = createContext({ 
  getProblems: (challengeID) => {},
  challenges: null,
  getChallenge: (challengeID) => {},
  getProblem:(challengeID,ProblemID) => {}
}); 

const CompetitionProvider = ({ children }) => {
  const [challenges,setChallenges] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPlannedChallenges();
        setChallenges(response.data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchData();
  }, []);

  const getProblems = (challengeID) => {
    const challenge = challenges.find(challenge => challenge._id === challengeID);
    console.log("challenge in context:"+challenge);
    if (challenge) {
        return challenge.algorithmicQuestions ;
    } else {
        return [];
    }
  }
  
  const getChallenge = (challengeID) => {
    return challenges.find(challenge => challenge._id === challengeID);
  }

  const getProblem = (challengeID, problemID) => {
    const challenge = challenges.find(challenge => challenge._id === challengeID);
    if (challenge) {
        return challenge.algorithmicQuestions.find(question => question._id === problemID);
    } else {
        return null;
    }
  }
  // Render children only when challenges are loaded
  return  (
    <CompetitionContext.Provider value={{ challenges,getProblems,getChallenge,getProblem}}>
      {children}
    </CompetitionContext.Provider>
  );
};

export default CompetitionProvider;