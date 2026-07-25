import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, verifiedArtisan } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getProducts)
  .post(protect, verifiedArtisan, createProduct);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, verifiedArtisan, updateProduct)
  .delete(protect, verifiedArtisan, deleteProduct);

export default router;
