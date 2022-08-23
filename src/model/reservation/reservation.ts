import mongoose from "mongoose";
import { ReservationStatus } from "../../../enums/enums";
const { RESERVED, CHECKED_IN, CHECKED_OUT, NO_SHOW, CANCELLED } =
  ReservationStatus;

const reservationSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide the email address"],
    unique: false,
    lowercase: true,
    trim: true,
  },
  reservation_id: {
    type: String,
    required: [true, "Please provide a valid reservation_id"],
  },
  customer_name: {
    type: String,
    required: [true, "Please provide a customer_name"],
  },
  customer_address: {
    type: String,
    required: [true, "Please provide a valid customer_address"],
  },
  customer_contact_number: {
    type: String,
    required: [true, "Please provide a valid customer_contact_number"],
  },
  arrival_date: {
    type: String,
    required: [true, "Please provide a valid arrival_date"],
  },
  departure_date: {
    type: String,
    required: [true, "Please provide a valid departure_date"],
  },
  hotel_id: {
    type: String,
    required: [true, "Please provide a valid hotel_id"],
  },
  room: {
    type: Object,
    required: [true, "Please provide a valid reservation_id"],
    value: {
      room_type_id: {
        type: String,
        required: [true, "Please provide a valid room_type"],
      },
      no_of_occupants: {
        type: Number,
        required: [true, "Please provide a valid no_of_occupants"],
      },
    },
  },
  credit_card_details: {
    type: Object,
    required: [false, "Please provide a valid credit_card_details"],
    value: {
      credit_card_number: {
        type: String,
        required: [true, "Please provide a valid credit_card_number"],
      },
      credit_card_expiry_date: {
        type: String,
        required: [true, "Please provide a valid credit_card_expiry_date"],
      },
      credit_card_cvv: {
        type: String,
        required: [true, "Please provide a valid credit_card_cvv"],
      },
      card_holder_name: {
        type: String,
        required: [true, "Please provide a valid card_holder_name"],
      },
    },
  },

  base_billing_value: {
    type: Number,
    required: [true, "Please enter a valid billing value"],
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },

  status: {
    type: String,
    default: RESERVED,
    enum: [RESERVED, CHECKED_IN, CHECKED_OUT, NO_SHOW, CANCELLED],
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);