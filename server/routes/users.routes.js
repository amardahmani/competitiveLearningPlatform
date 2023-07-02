import express from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/users.controller.js";

const router = express.Router();

router.get("", getUsers);
router.post("",createUser);
router.delete("/:id",deleteUser);
router.put("/:id",updateUser);
export default router;