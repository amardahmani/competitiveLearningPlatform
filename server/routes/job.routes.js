import express from 'express';
import { posterUpload } from '../middleware/upload.js';
import { verifyToken } from '../middleware/authJwt.js';
import { getJobs,deleteJob,createJob, pushAlgorithmicJob, getJobsRecruiter, getJobAlgorithmicProblems, getUnplannedJobs, getNonInstructors, getInstructors, pushInstructor, removeInstructor, updateJob, getJobsPlanned, dropAlgorithmicJob } from '../controllers/job.controller.js';

const router = express.Router();

router.get("/",getJobs);
router.post("/",verifyToken,posterUpload.single('poster'),createJob);
router.delete("/:jobID",verifyToken,deleteJob);
router.put("/:jobID",posterUpload.single('poster'),updateJob);
router.get("/recruiter",verifyToken,getJobsRecruiter);
router.post("/:jobID/questions",pushAlgorithmicJob);
router.get("/:jobID/questions",getJobAlgorithmicProblems);
router.get("/unplanned",getUnplannedJobs);
router.get("/palnned",getJobsPlanned);
router.get('/:jobID/Noninstructors',getNonInstructors);
router.get('/:jobID/instructors',getInstructors);
router.post('/:jobID/add',pushInstructor);
router.delete('/:jobID/delete/:instructorID',removeInstructor);
router.delete('/:jobID/:questionID',dropAlgorithmicJob);

export default router;