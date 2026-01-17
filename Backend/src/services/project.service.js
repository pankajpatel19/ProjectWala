import Project from "../models/project.model.js";
import { uploadToCloudinary } from "../utils/cloudinary/clodinary.js";
import ApiError from "../middleware/apiError.midllware.js";

class ProjectService {
  async createProject(data, file, user) {
    const { name, description, price, primary_language, technology } = data;
    if (!file) {
      throw new ApiError("Project file is required", 400);
    }
    const cloudUrl = await uploadToCloudinary(file.path);

    if (!cloudUrl) {
      throw new ApiError("Failed to upload file to cloud", 500);
    }

    const newProject = await Project.create({
      name,
      description,
      price,
      primary_language,
      technology,
      thumbnail: cloudUrl.url,
      file_url: cloudUrl.url,
      user_id: user.id,
    });
    return newProject;
  }

  async getAllProjects(user) {
    const projects = await Project.find({ user_id: user.id });

    if (!projects) {
      throw new ApiError("No projects found for this user", 404);
    }
    return projects;
  }

  async deActivateProject(projectId, user) {
    const project = await Project.findOneAndUpdate(
      { _id: projectId, user_id: user.id },
      { isActive: false },
      { new: true }
    );

    if (!project) {
      throw new ApiError(
        "Project not found or you do not have permission.",
        404
      );
    }
    return project;
  }

  async projectFilter({ category, techStack, price, skip }) {
    const filterProject = await Project.find({
      isActive: true,
      ...(category && { primary_language: category }),
      ...(techStack && { technology: techStack }),
      ...(price && { price: { $lte: price } }),
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .skip(skip ? parseInt(skip) : 0);
    if (!filterProject) {
      throw new ApiError("No projects found with the given filters", 404);
    }
    return filterProject;
  }
  async getProjectForUser() {
    const project = await Project.find({ isActive: true }).sort({
      createdAt: -1,
    });

    if (!project) {
      throw new ApiError("No active projects found", 404);
    }
    return project;
  }
}

export default new ProjectService();
