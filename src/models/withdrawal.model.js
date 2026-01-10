import mongoose, { Schema } from "mongoose";

const withdrawalSchema = new Schema({
  seller_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true },
  bankDetails: {
    accountNumber: { type: String, required: true },
    accountHolderName: { type: String, required: true },
    ifscCode: { type: String, required: true },
  },
  transactionId: { type: String },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  adminNotes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Withdrawal = mongoose.model("Withdrawal", withdrawalSchema);

export default Withdrawal;

//
