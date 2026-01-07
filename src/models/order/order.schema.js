import { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    project_id: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Cancelled"],
      default: "Pending",
    },
    total_amount: { type: Number, required: true },
    amdin_fee: { type: Number, default: 0 },
    seller_amount: { type: Number, required: true },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

export default Order;
