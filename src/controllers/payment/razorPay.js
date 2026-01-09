import crypto from "crypto";
import ApiError from "../../middleware/apiError.midllware";
import { catchAsync } from "../../middleware/catchAsync.middleware";
import Project from "../../models/project.model";
import { razorpayInstance } from "../../config/razorpay";

export const createRazorPayOrder = catchAsync(async (req, res, next) => {
  const { projectId } = req.body;

  const project = await Project.findOne({ id: projectId });

  if (!project) {
    throw new ApiError("project Not Found", 404);
  }

  const option = {
    amount: project.price * 100,
    currency: "INR",
    receipt: `receipt${Date.now()}`,
  };
  const order = await razorpayInstance.orders.create(option);

  res.status(200).json({
    success: true,
    order_id: order.id,
    amount: order.amount,
    key_id: process.env.RAZORPAY_KEY_ID,
  });
});

export const verifyPayment = catchAsync(async (req, res, next) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    projectId,
  } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // PAYMENT IS VALID!

    const project = await Project.findById(projectId);
    const sellerId = project.user_id;
    const totalAmount = project.price;

    // 2. Create Order Record in DB
    await Order.create({
      user_id: req.user.id,
      project_id: projectId,
      sellerId: req.user.id,
      amount: totalAmount,
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      status: "Confirmed",
    });

    const sellerEarning = totalAmount * 0.8;

    await User.findByIdAndUpdate(sellerId, {
      $inc: { balance: sellerEarning },
    });

    res
      .status(200)
      .json({ success: true, message: "Payment Verified & Access Granted" });
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid Signature, Payment Tampered!",
    });
  }
});
