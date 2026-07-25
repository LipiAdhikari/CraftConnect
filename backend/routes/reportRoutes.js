import express from "express";
const router = express.Router();
import {
  createReport,
  getReports,
  updateReport,
  getMyReports,
} from "../controllers/reportController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createReport).get(protect, admin, getReports);
router.route("/myreports").get(protect, getMyReports);
router.route("/:id").put(protect, admin, updateReport);

export default router;
