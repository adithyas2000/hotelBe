import mongoose from "mongoose";

const revenueSchema = new mongoose.Schema({
  revenue_date: {
    type: String,
    required: [true, "Please provide the revenue_date"],
    unique: true,
  },
  total_occupancy: {
    type: Number,
    required: [true, "Please provide a valid total_occupancy"],
  },
  revenue: {
    type: Number,
    required: [true, "Please provide a valid revenue"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

export const Revenue = mongoose.model("Revenue", revenueSchema);
