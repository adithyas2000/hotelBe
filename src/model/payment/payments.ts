import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    reservation_id: {
        type: String,
        required: [true, "Please provide a valid Reservaation Id"]
    },
    total_charged: {
        type: mongoose.Types.Decimal128,
        required: [true, "Please provide a valid amount"]
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
});

export const Payment = mongoose.model("Payment", paymentSchema);
