import mongoose from "mongoose";
import Challenge from "../models/challenge.model.js";
import Plannification from "../models/plannification.model.js";

export const createPlannification = async (req,res) => {
    
    try {
      const { startDate, endDate, event, type } = req.body;
  
      // Check if the provided type is valid
      if (!['Job', 'Challenge'].includes(type)) {
        return res.status(400).json({ message: 'Invalid type provided' });
      }
  
      // Check if the referenced event exists
      let eventModel;
      if (type === 'Job') {
        eventModel = Job;
      } else if (type === 'Challenge') {
        eventModel = Challenge;
      }
  
      const eventExists = await eventModel.exists({ _id: event });
      if (!eventExists) {
        return res.status(404).json({ message: 'Referenced event not found' });
      }
  
      // Create the Plannification
      const plannification = new Plannification({ startDate, endDate, event, type });
      const savedPlannification = await plannification.save();
  
      return res.status(201).json(savedPlannification);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const getPlannedEventsCalendar = async (req,res) => {
  try {
    const plannedEvents = await Plannification.find().populate('event');
    console.log(plannedEvents);
    if(!plannedEvents){
      return res.status(404).send({message:"no event found"})
    }
    const formattedEvents = plannedEvents.map(plannification => ({
      id: plannification._id,
      title: plannification.event.title,
      start: plannification.startDate,
      end: plannification.endDate
    }));

    res.status(200).send(formattedEvents);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while retrieving planned events.' });
  }
}