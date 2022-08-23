import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  reservation_id:{
    type:String,
    required:[true,"Please provide a valid Reservaation Id"]
  },
  total_charged:{
    type:mongoose.Types.Decimal128,
    required:[true,"Please provide a valid amount"]
  }
});

export const Payment = mongoose.model("Payment", paymentSchema);
