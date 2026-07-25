import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["buyer", "artisan", "admin"],
      default: "buyer",
    },

    // Artisan Fields
    phone: { type: String },
    district: { type: String },
    craftCategory: { type: String },
    experience: { type: String },
    bio: { type: String },

    // Artisan Verification Documents
    citizenshipDocument: { type: String },
    profilePhoto: { type: String },
    workshopPhoto: { type: String },
    craftPhotos: [{ type: String }],
    video: { type: String },

    verificationStatus: {
      type: String,
      enum: ["none", "pending", "verified", "rejected"],
      default: "none",
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
