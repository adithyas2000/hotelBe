import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
  },
  client_id: {
    type: String,
    unique: true,
  },
});

export const Client = mongoose.model("Client", clientSchema);
