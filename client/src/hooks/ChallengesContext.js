import React, { createContext, useState, useEffect } from 'react';
import { getChallengesUser } from '../services/challenge.service';

export const ChallengesContext = createContext({ 
  challenges: null,
  deleteChallengeClient: () => {},
  updateChallenges: () => {} 

}); 

const ChallengesProvider = ({ children }) => {
  const [challenges, setChallenges] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChallengesUser();
        setChallenges(response.data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    fetchData();
  }, []);


  const deleteChallengeClient = (challengeID) =>{
    setChallenges(challenges.filter(challenge => challenge._id!== challengeID));
  }

  const updateChallenges = (updatedChallenge) => {
    setChallenges(challenges.map(challenge => challenge._id === updatedChallenge._id? updatedChallenge : challenge));
  }

  // Render children only when challenges are loaded
  return challenges !== null ? (
    <ChallengesContext.Provider value={{ challenges,deleteChallengeClient,updateChallenges }}>
      {children}
    </ChallengesContext.Provider>
  ) : null;
};

export default ChallengesProvider;