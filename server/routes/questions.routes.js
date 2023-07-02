import express from "express";

import { createAlgorithmic, getAlgorithmic, getAllAlgorithmic, pushAlgorithmic } from "../controllers/question.controller.js";
import { algorithmicUpload } from "../middleware/upload.js";
import { verifyToken } from "../middleware/authJwt.js";
const router = express.Router();

router.post('/algorithmic',verifyToken ,algorithmicUpload.fields([{ name: 'input' }, { name: 'expectedOutput' }]),
createAlgorithmic);
router.get('/algorithmic/:id',getAlgorithmic);
router.get('/algorithmic',getAllAlgorithmic);
router.post('/push',pushAlgorithmic);
export default router;
