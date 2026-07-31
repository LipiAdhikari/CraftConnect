import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { protect, verifiedArtisan } from '../middleware/authMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configure Cloudinary with credentials from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    return {
      folder: 'craftconnect_uploads',
      resource_type: 'auto', // This allows both images and videos
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'avi', 'mkv', 'webm'],
    };
  },
});

const upload = multer({ storage });

// Public upload route (e.g., for buyer/artisan registration)
router.post('/public', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file provided');
  }
  res.send({
    message: 'File Uploaded Successfully to Cloudinary',
    imageUrl: req.file.path, // Cloudinary provides the secure URL in req.file.path
  });
});

// Protected upload route (e.g., for creating products)
router.post('/', protect, verifiedArtisan, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file provided');
  }
  res.send({
    message: 'File Uploaded Successfully to Cloudinary',
    imageUrl: req.file.path,
  });
});

export default router;
