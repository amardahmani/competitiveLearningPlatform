import multer from "multer";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*Storage */

const AlgorithmicStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/questions/algorithmic");
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.txt');
    },
  });

const articleStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/articles"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const originalName = file.originalname
      .replace(/\s+/g, "-")
      .toLowerCase();
    cb(null, originalName + "-" + uniqueSuffix + path.extname(file.originalname));
  },
})  

const posterStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/poster"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    const originalName = file.originalname
      .replace(/\s+/g, "-")
      .toLowerCase();
    cb(null, originalName + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

 

export const algorithmicUpload = multer({storage:AlgorithmicStorage});

export const articleUpload= multer({storage:articleStorage});
export const posterUpload = multer({storage:posterStorage});