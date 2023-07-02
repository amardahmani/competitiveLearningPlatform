import express from "express";
import { register,verifyEmail,verifyCode,login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/verifyEmail",verifyEmail);
router.post("/verifyCode",verifyCode);
router.post("/login",login);

export default router;