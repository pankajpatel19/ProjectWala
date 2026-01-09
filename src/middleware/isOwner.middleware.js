import mongoose from "mongoose";
import ApiError from "./apiError.midllware.js";
import Project from "../models/project/project.model.js";

export const isOwner = async (req, res, next) => {
  try {
    const user_id = req.user.id;
    const { id } = req.params;
    const role = req.params.role;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new ApiError("Invalid Project Id", 400);
    }

    const project = await Project.findById(id);

    if (!project) {
      throw new ApiError("Project Not FOund", 404);
    }

    if (role === "admin") {
      next();
    }

    if (project.user_id.toString() !== user_id.toString()) {
      throw new ApiError("unAuthorized", 403);
    }
    next();
  } catch (error) {
    console.error("ownerSHip error : ", error.message);
    next(error.message);
  }
};
