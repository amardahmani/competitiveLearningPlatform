import express from 'express'
import { createChallenge, deleteChallenge, getChallenge, getChallengeQuestions, getChallengesPlanned, getChallengesUser, getInstructors, getNonInstructors, getUnplannedChallenges, joinAlgorithmic, pushAlgorithmicChallenge, pushInstructor, removeInstructor, updateChallenge } from '../controllers/challenge.controller.js'
import { posterUpload } from '../middleware/upload.js';
import { verifyToken } from '../middleware/authJwt.js';
const router = express.Router()

router.post('/create',posterUpload.single('poster'),createChallenge);
router.put('/:challengeID',posterUpload.single('poster'),updateChallenge);
router.delete('/:challengeID',deleteChallenge);
router.get('/unplanned',getUnplannedChallenges);
router.get('/planned',getChallengesPlanned);
router.get('/user', verifyToken, getChallengesUser);
router.get('/:id',getChallenge);
router.post('/join/algorithmic',joinAlgorithmic);
router.get('/:id/questions',getChallengeQuestions);
router.post('/:challengeID/questions',pushAlgorithmicChallenge);
router.get('/:challengeID/Noninstructors',getNonInstructors);
router.get('/:challengeID/instructors',getInstructors);
router.post('/:challengeID/add',pushInstructor);
router.delete('/:challengeID/delete/:instructorID',removeInstructor);
export default router;