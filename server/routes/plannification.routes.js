import express from 'express';

import { createPlannification, getPlannedEventsCalendar,  } from '../controllers/plannification.controller.js';

const router = express.Router();

router.post('',createPlannification);
router.get('',getPlannedEventsCalendar);
export default router;