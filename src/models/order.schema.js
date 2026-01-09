import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    project_id: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    amount: { type: Number, required: true },

    razorpay_order_id: {
      type: String,
    },
    paymentId: {
      type: String,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

export default Order;
