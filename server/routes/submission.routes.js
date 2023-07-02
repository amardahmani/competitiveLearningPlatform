import express from 'express';
import { createSubmission } from '../controllers/submission.controller.js';
import { verifyToken } from '../middleware/authJwt.js';


const router = express.Router();

router.post('',verifyToken,createSubmission);

export default router;