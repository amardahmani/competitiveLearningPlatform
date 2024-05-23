import React, { createContext, useState, useEffect } from 'react';
import { getPlannedChallenges } from '../services/challenge.service';
import { useParams } from 'react-router-dom';
import { getPlannedCompetitions, getPlannedEvents } from '../services/plannification.service';

export const CompetitionContext = createContext({ 
  getProblems: (eventID) => {},
  events: null,
  getEvent: (eventID) => {},
  getProblem:(eventID,problemID) => {}
}); 

const CompetitionProvider = ({ children }) => {
  const [events,setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await getPlannedCompetitions();
        console.log(response.data);
        setEvents(response.data)
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[])

  const getEvent = () => {

  }
  const getProblems = () => {

  }

  const getProblem = () => {
    
  }
  // Render children only when challenges are loaded
  return  (
    <CompetitionContext.Provider value={{ events,getProblems,getEvent,getProblem}}>
      {children}
    </CompetitionContext.Provider>
  );
};

export default CompetitionProvider;