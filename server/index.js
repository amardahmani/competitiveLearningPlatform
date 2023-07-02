import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import questionRoutes from './routes/questions.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import challengeRoutes from './routes/challenge.routes.js'
import plannificationRoutes from './routes/plannification.routes.js';
import submissionRoutes from './routes/submission.routes.js';
import pathRoutes from './routes/path.routes.js';
import moduleRoutes from './routes/module.routes.js';
import jobRoutes from './routes/job.routes.js';
/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDirectory = path.join(__dirname, 'uploads');
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
// Parse incoming request bodies in JSON format
app.use(bodyParser.json());

// Parse incoming request bodies in URL-encoded format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(uploadDirectory));
//routes
app.use("/auth", authRoutes);
app.use("/users",usersRoutes);

app.use("/questions",questionRoutes);
app.use("/uploads",uploadRoutes);
app.use("/challenge",challengeRoutes);
app.use("/plan",plannificationRoutes);
app.use("/submissions",submissionRoutes);
app.use("/path",pathRoutes);
app.use("/module",moduleRoutes);
app.use("/job",jobRoutes)
/* MONGOOSE SETUP */

const PORT = process.env.PORT || 3001;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

  
