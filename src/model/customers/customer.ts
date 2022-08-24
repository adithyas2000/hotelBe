import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  reservation_id: {
    type: String,
    required: [true, "Please provide a valid reservation_id"],
  },
  room_number: {
    type: String,
    required: [true, "Please provide the room_numbers"],
  },
  

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

export const Customer = mongoose.model("Customer", customerSchema);
