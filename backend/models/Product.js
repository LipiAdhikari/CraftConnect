import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: true },

    // Authenticity Fields
    artisanName: { type: String, required: true },
    artisanLocation: { type: String, required: true },
    artisanStory: { type: String, required: true },

    // Transparent Pricing Fields
    price: { type: Number, required: true },
    priceBreakdown: {
      artisanCut: { type: Number, required: true },
      materialsCost: { type: Number, required: true },
      platformFee: { type: Number, required: true },
    },

    inStock: { type: Boolean, default: true },
    rating: { type: Number, default: 0 },
    isUnderReview: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

// Indexing for search
productSchema.index({ name: "text", category: "text" });

const Product = mongoose.model("Product", productSchema);

export default Product;
