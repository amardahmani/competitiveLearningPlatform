import express from 'express';
import { verifyToken } from '../middleware/authJwt.js';
import { posterUpload } from '../middleware/upload.js';
import {createModule,deleteModule,getModules} from '../controllers/module.controller.js'
const router = express.Router();

router.get('/:pathID',getModules);
router.post('/:pathID',verifyToken,posterUpload.single('image'),createModule);
router.delete('/:moduleID',deleteModule);
export default router;