import mongoose from "mongoose";

const travelCompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the email address"],
    unique: true,
    lowercase: true,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide the email address"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

export const TravelCompany = mongoose.model(
  "TravelCompany",
  travelCompanySchema
);
