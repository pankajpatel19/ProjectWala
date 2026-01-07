import { catchAsync } from "../../middleware/catchAsync.middleware.js";
import ProjectService from "../../services/project/project.service.js";

export const createProjectService = catchAsync(async (req, res, next) => {
  const project = await ProjectService.createProject(
    req.body,
    req.file,
    req.user
  );
  return res.status(201).json({
    status: "success",
    data: project,
  });
});
