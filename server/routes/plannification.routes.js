import express from 'express';

import { createPlannification, getPlannedCompetitions, getPlannedEventsCalendar  } from '../controllers/plannification.controller.js';

const router = express.Router();

router.post('',createPlannification);
router.get('',getPlannedEventsCalendar);
router.get('/competitions',getPlannedCompetitions)
export default router;