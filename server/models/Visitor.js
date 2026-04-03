const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    visitorNumber: {
      type: Number,
      unique: true
    },
    visitorIdLabel: {
      type: String
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      required: true,
      trim: true
    },
    purpose: {
      type: String,
      required: true,
      trim: true
    },
    personToMeet: {
      type: String,
      required: true,
      trim: true
    },
    department: {
      type: String,
      required: true,
      trim: true
    },
    photo: {
      type: String,
      required: true
    },
    signature: {
      type: String,
      required: true
    },
    checkInTime: {
      type: Date,
      default: Date.now
    },
    checkOutTime: {
      type: Date,
      default: null
    },
    status: {
      type: String,
      enum: ["IN", "OUT"],
      default: "IN"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);