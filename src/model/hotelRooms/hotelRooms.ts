import mongoose from "mongoose";

const hotelRoomSchema = new mongoose.Schema({
  hotel_id: {
    type: String,
    required: [true, "Please provide the hotel_id"],
    unique: false,
    lowercase: true,
    trim: true,
  },

  room_type_id: {
    type: String,
    required: [true, "Please provide a valid room_type"],
  },
  room_type: {
    type: String,
    required: [true, "Please provide a valid room_type"],
  },
  max_no_of_occupants: {
    type: Number,
    required: [true, "Please provide a valid no_of_occupants"],
  },
  no_of_rooms: {
    type: Number,
    required: [true, "Please provide a valid no_of_rooms"],
  },
  base_fee: {
    type: Number,
    required: [true, "Please provide a valid base_fee"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

export const HotelRoom = mongoose.model("HotelRoom", hotelRoomSchema);
