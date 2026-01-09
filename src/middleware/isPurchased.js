import mongoose from "mongoose";
import Order from "../models/order/order.schema.js";

export const isPurchased = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { projectId } = req.params;

    if (!id || !projectId) {
      return res.status(400).json({
        status: "fail",
        message: "User ID and Project ID are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid Project ID",
      });
    }

    const order = await Order.findOne({
      user_id: id,
      project_id: projectId,
      status: "Confirmed",
    });

    if (!order) {
      return res.status(404).json({
        status: "fail",
        message: "make purchase to access this project",
      });
    }

    next();
  } catch (error) {
    console.error("isPurchased error :", error.message);

    next(error.message);
  }
};
