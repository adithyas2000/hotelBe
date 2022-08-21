import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  venue_id: {
    type: String,
    required: [true, "Please provide the venue_id"],
    unique: false,
    lowercase: true,
    trim: true,
  },
  venue_type: {
    type: String,
    required: [true, "Please provide a valid venue_type"],
  },
  venue_name: {
    type: String,
    required: [true, "Please provide a valid venue_name"],
  },
  venue_address: {
    type: String,
    required: [true, "Please provide a valid venue_address"],
  },
  venue_contact_number: {
    type: String,
    required: [true, "Please provide a valid venue_contact_number"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

export const Venue = mongoose.model("Venue", venueSchema);
