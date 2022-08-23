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
  optional_charges: {
    type: Array,
    required: false,
  },

  fee_for_the_period: {
    type: Number,
    required: [true, "Please provide the fee for the period"],
  },

  no_of_additional_nights: {
    type: Number,
    default: 0,
    required: false,
  },

  fee_for_additional_nights: {
    type: Number,
    default: 0,
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

export const Customer = mongoose.model("Customer", customerSchema);
