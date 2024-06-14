import { model, Schema } from "mongoose";

const ContractSchema = new Schema(
  {
    motocycles: { type: Number, required: true, default: 0 },
    isDevided: { type: Boolean, required: true, default: false },
    userId: { type: String, required: true },
    img: { type: String },
  },
  { timestamps: true }
);

export default model("Contracts", ContractSchema);
