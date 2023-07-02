import express from "express";

import { uploadImages } from "../controllers/upload.controller.js";
import { articleUpload } from "../middleware/upload.js";

const router = express.Router();

router.post('',articleUpload.single('image'),uploadImages);

export default router;