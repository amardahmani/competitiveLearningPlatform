import express from 'express';
import { createPath, deletePath, getAllPaths, getInstructors, getNonInstructors, pushInstructor, removeInstructor, updatePath } from '../controllers/path.controller.js';
import { verifyToken } from '../middleware/authJwt.js';
import { posterUpload } from '../middleware/upload.js';

const router = express.Router();

router.get('/',getAllPaths);
router.post('/',verifyToken,posterUpload.single('image'),createPath);
router.delete('/:pathID',deletePath);
router.put('/:pathID',posterUpload.single('image'),updatePath);
router.get('/:pathID/Noninstructors',getNonInstructors);
router.get('/:pathID/instructors',getInstructors);
router.post('/:pathID/add',pushInstructor);
router.delete('/:pathID/delete/:instructorID',removeInstructor);
export default router;