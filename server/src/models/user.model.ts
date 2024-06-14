import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String },
    fullName: { type: String },
    contracts: { type: Array, default: [] },
    phone: { type: String },
    nationalId: { type: String },
    verifiyStage: { type: String, default: "first" },
  },

  { timestamps: true }
);

export default model("User", UserSchema);
