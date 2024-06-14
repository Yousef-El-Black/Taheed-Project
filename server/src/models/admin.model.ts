import { model, Schema } from "mongoose";

const AdminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    fullName: { type: String },
    phone: { type: String },
    fullAccess: { type: Boolean, default: false },
    creatorID: { type: String },
  },
  { timestamps: true }
);

export default model("Admins", AdminSchema);
