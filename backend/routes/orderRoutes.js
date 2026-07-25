import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderStatus,
  getMyOrders,
  getOrders,
  getOrderStats,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/stats").get(protect, admin, getOrderStats);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/status").put(protect, admin, updateOrderStatus);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
