
const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    age: {
      type: Number,
      required: true,
      min: 1
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    membershipPlan: {
      type: String,
      enum: ["Monthly", "Quarterly", "Yearly"],
      required: true
    },
    membershipStartDate: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Member", memberSchema);
