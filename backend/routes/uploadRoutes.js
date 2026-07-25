import express from "express";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/"); // Save files to backend/uploads directory
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|webp|mp4|mov|avi|mkv|webm/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images and Videos only!');
  }
}

import { protect, verifiedArtisan } from "../middleware/authMiddleware.js";

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/public", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No image provided");
  }
  const protocol = req.protocol;
  const host = req.get("host");
  res.send({
    message: "Image Uploaded Successfully",
    imageUrl: `${protocol}://${host}/${req.file.path.replace(/\\/g, "/")}`,
  });
});

router.post(
  "/",
  protect,
  verifiedArtisan,
  upload.single("image"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send("No image provided");
    }
    const protocol = req.protocol;
    const host = req.get("host");
    res.send({
      message: "Image Uploaded Successfully",
      imageUrl: `${protocol}://${host}/${req.file.path.replace(/\\/g, "/")}`,
    });
  },
);

export default router;
