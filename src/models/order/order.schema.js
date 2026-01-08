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
    project_amount: { type: Number, required: true },
    seller_amount: { type: Number, required: true },
    admin_fee: { type: Number, default: 0 },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

export default Order;
