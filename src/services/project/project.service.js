import Project from "../../models/project/project.model.js";
import { uploadToCloudinary } from "../../utils/cloudinary/clodinary.js";

class ProjectService {
  async createProject(data, file, user) {
    const { name, description, price, primary_language, technology } = data;

    const cloudUrl = await uploadToCloudinary(file.path);

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
    return projects;
  }
}

export default new ProjectService();
