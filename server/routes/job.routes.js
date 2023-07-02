import express from 'express';
import { posterUpload } from '../middleware/upload.js';
import { verifyToken } from '../middleware/authJwt.js';
import { getJobs,deleteJob,createJob, pushAlgorithmicJob, getJobsRecruiter, getJobAlgorithmicProblems, getUnplannedJobs, getNonInstructors, getInstructors, pushInstructor, removeInstructor } from '../controllers/job.controller.js';

const router = express.Router();

router.get("/",getJobs);
router.post("/",verifyToken,posterUpload.single('poster'),createJob);
router.delete("/:jobID",verifyToken,deleteJob);
router.get("/recruiter",verifyToken,getJobsRecruiter);
router.post("/questions",pushAlgorithmicJob);
router.get("/questions/:jobID",getJobAlgorithmicProblems);
router.get("/unplanned",getUnplannedJobs);
router.get('/:jobID/Noninstructors',getNonInstructors);
router.get('/:jobID/instructors',getInstructors);
router.post('/:jobID/add',pushInstructor);
router.delete('/:jobID/delete/:instructorID',removeInstructor);
export default router;