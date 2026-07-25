import mongoose from "mongoose";

const reportSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reason: {
      type: String,
      required: true,
      enum: [
        "Looks machine-made instead of handmade",
        "Product received is different from the listing",
        "Misleading description",
        "Fake artisan information",
        "Poor quality / damaged item",
        "Suspected counterfeit",
        "Other",
      ],
    },
    description: {
      type: String,
    },
    evidenceImages: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["Pending Review", "Under Investigation", "Resolved", "Rejected"],
      default: "Pending Review",
    },
    adminNotes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Report = mongoose.model("Report", reportSchema);

export default Report;
