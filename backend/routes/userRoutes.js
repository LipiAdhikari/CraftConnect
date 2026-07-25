import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  getPendingArtisans,
  verifyArtisan,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").get(protect, getUserProfile);

// Admin verification routes
router.route("/artisans/pending").get(protect, admin, getPendingArtisans);
router.route("/:id/verify").put(protect, admin, verifyArtisan);

export default router;
