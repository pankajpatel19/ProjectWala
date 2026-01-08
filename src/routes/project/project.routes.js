import { Router } from "express";
import upload from "../../middleware/multer.middleware.js";
import {
  createProjectService,
  getAllProjectsService,
  deActivateProjectService,
  getProjectForUserService,
} from "../../controllers/project/project.controller.js";
import { authMiddleware } from "../../middleware/AuthMiddleware.js";
import { roleAccess } from "../../middleware/roleAccess.middleware.js";
import { isOwner } from "../../middleware/isOwner.middleware.js";
const router = Router();

router.post(
  "/upload-project",
  authMiddleware,
  roleAccess("seller"),
  upload.single("projectImage"),
  createProjectService
);

router.get(
  "/getProjects",
  authMiddleware,
  roleAccess("seller"),
  getAllProjectsService
);

router.patch(
  "/deactivate-project/:projectId",
  authMiddleware,
  roleAccess("seller", "admin"),
  isOwner,
  deActivateProjectService
);

router.get(
  "/projects",
  authMiddleware,
  roleAccess("user"),
  getProjectForUserService
);
export default router;
