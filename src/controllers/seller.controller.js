import ApiError from "../middleware/apiError.midllware.js";
import { catchAsync } from "../middleware/catchAsync.middleware.js";
import Project from "../models/project.model.js";

export const sellerStatus = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const role = req.user.role;

  if (!id || role !== "seller") {
    throw new ApiError("User is not a seller", 403);
  }

  const totalUploadedProjects = await Project.countDocuments({
    user_id: id,
    role: "seller",
  });

  if (!totalUploadedProjects) {
    throw new ApiError("No projects uploaded by this seller", 404);
  }
  res.status(200).json({
    status: "success",
    data: { totalUploadedProjects },
  });
});

export const getSellerProjects = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    throw new ApiError("Seller ID is required", 400);
  }
  const projects = await Project.find({ user_id: id });

  if (!projects || projects.length === 0) {
    throw new ApiError("No projects found for this seller", 404);
  }
  res.status(200).json({
    status: "success",
    data: projects,
  });
});
