import Order from "../../models/order/order.schema.js";
import ApiError from "../../middleware/apiError.midllware.js";
import cloudinary from "../../config/cloudinary.config.js";

class OrderService {
  async createOrder({ userId, projectId, projectAmount }) {
    const existOrder = await Order.findOne({
      user_id: userId,
      project_id: projectId,
    });

    if (existOrder) {
      throw new ApiError(409, "Order already exists for this project and user");
    }
    const adminFee = projectAmount * 0.1; // 10% admin fee
    const sellerAmount = projectAmount - adminFee;

    const order = new Order({
      user_id: userId,
      project_id: projectId,
      project_amount: projectAmount,
      status: "Confirmed",
      admin_fee: adminFee,
      seller_amount: sellerAmount,
    });

    await order.save();
    return order;
  }

  async downloadProject({ userId, projectId }) {
    if (!userId || !projectId) {
      throw new ApiError(400, "User ID and Project ID are required");
    }
    const purchased = await Order.findOne({
      user_id: userId,
      project_id: projectId,
      status: "Confirmed",
    });

    const expiryTime = Math.floor(Date.now() / 1000 + 5 * 60); // 5 minutes from now

    if (!purchased) {
      throw new ApiError(403, "Project not purchased or access expired");
    }

    const signedUrl = cloudinary.utils.private_download_url("", "zip", {
      resource_type: "raw",
      type: "authenticated",
      expires_at: expiryTime,
      flags: "attachedFile",
    });
    return signedUrl;
  }
}

export default new OrderService();
