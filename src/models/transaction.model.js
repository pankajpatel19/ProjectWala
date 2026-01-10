import mongoose, { Schema } from "mongoose";

const transactionSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },

  amount: { type: Number, required: true },
  type: {
    type: String,
    enum: ["credit", "debit"],
    required: true,
  },
  paymentId: {
    type: String,
  },
  razorpay_order_id: {
    type: String,
  },
  razorpay_signature: {
    type: String,
  },
  razorpay_payment_id: {
    type: String,
  },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
