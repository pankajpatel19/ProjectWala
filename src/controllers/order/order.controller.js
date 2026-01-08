import catchAsync from "../../middleware/catchAsync.middleware.js";
import orderService from "../../services/order/order.service.js";

export const checkOut = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { id } = req.user;
  const { projectAmount } = req.body;

  const order = await orderService.createOrder({
    projectId,
    userId: id,
    projectAmount,
  });

  res.status(201).json({
    status: "success",
    data: { order },
  });
});

export const downloadProject = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const { id } = req.user;
  const signedUrl = await orderService.downloadProject({
    userId: id,
    projectId,
  });
  res.status(200).json({
    status: "success",
    data: { downloadUrl: signedUrl },
  });
});
