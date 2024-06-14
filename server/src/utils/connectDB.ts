import mongoose from "mongoose";
import { MONGODB_URI } from "../config";

export const connectDB = async () => {
  try {
    mongoose.connect(MONGODB_URI as string);
    console.log("DB Connected!");
  } catch (err) {
    console.log(err);
  }
};
