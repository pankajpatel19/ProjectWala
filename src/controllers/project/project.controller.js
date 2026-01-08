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

export const getAllProjectsService = catchAsync(async (req, res, next) => {
  const projects = await ProjectService.getAllProjects(req.user);
  return res.status(200).json({
    status: "success",
    results: projects.length,
    data: projects,
  });
});

export const deActivateProjectService = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const project = await ProjectService.deActivateProject(projectId, req.user);
  return res.status(200).json({
    status: "success",
    data: project,
  });
});

export const getProjectForUserService = catchAsync(async (req, res, next) => {
  const project = await ProjectService.getProjectForUser();
  return res.status(200).json({
    status: "success",
    data: project,
  });
});

export const projectFilterService = catchAsync(async (req, res, next) => {
  const { category, techStack, price, skip } = req.query;
  const projects = await ProjectService.projectFilter({
    category,
    techStack,
    price,
    skip,
  });
  return res.status(200).json({
    status: "success",
    data: projects,
  });
});
