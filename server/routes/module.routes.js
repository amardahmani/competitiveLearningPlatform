import express from 'express';
import { verifyToken } from '../middleware/authJwt.js';
import { posterUpload } from '../middleware/upload.js';
import {createModule,deleteModule,dropAlgorithmicQuestion,getAlgorithmicQuestions,getModules, pushAlgorithmicQuestion, updateModule} from '../controllers/module.controller.js'
const router = express.Router();

router.get('/:pathID',getModules);
router.post('/:moduleID/questions',verifyToken,pushAlgorithmicQuestion);
router.delete('/:moduleID/questions/:questionID',verifyToken,dropAlgorithmicQuestion);
router.get('/:moduleID/questions',verifyToken,getAlgorithmicQuestions);
router.post('/:pathID',verifyToken,posterUpload.single('image'),createModule);
router.delete('/:pathID/:moduleID',deleteModule);
router.put('/:pathID/:moduleID',posterUpload.single('image'),updateModule);
export default router;