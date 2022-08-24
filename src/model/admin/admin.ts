import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextFunction } from "express";
import { UserTypes } from "../../../enums/enums";

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide the email address"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a valid password"],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    default: UserTypes.ADMIN,
  },
  admin_id: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// hashing the password when creating a new user
adminSchema.pre("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 9);

  next();
});

// validate user entered password
adminSchema.methods.checkPassword = async function (
  candidatePassword: String,
  userPassword: String
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export const Admin = mongoose.model("Admin", adminSchema);
