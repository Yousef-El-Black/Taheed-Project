import { model, Schema } from "mongoose";

const ContractSchema = new Schema(
  {
    motocycles: { type: Number, required: true, default: 0 },
    isDevided: { type: Boolean, required: true, default: false },
    userId: { type: String, required: true },
    img: { type: String },
    rent: { type: Number },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

export default model("Contracts", ContractSchema);
