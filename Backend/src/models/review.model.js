import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    average: { type: Number, required: true },
    comment: { type: String, required: false },
  },
  { timestamps: true }
);
const Review = mongoose.model("Review", ReviewSchema);

export default Review;
