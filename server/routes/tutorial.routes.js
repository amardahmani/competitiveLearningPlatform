import express from "express";
import { verifyToken } from '../middleware/authJwt.js';
import { createTutorial, deleteTutorial, getTutorials, updateTutorial } from "../controllers/gamifiedTutotial.controller.js";

const router = express.Router();

router.get('/:moduleID',getTutorials);
router.post('/:moduleID',verifyToken,createTutorial);
router.delete('/:moduleID/:tutorialID',verifyToken,deleteTutorial);
router.put('/:moduleID/:tutorialID',verifyToken,updateTutorial);

export default router;