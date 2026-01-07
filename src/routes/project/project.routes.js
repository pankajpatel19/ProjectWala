import { Router } from "express";
import upload from "../../middleware/multer.middleware.js";
import {
  createProjectService,
  getAllProjectsService,
  deActivateProjectService,
} from "../../controllers/project/project.controller.js";
import { authMiddleware } from "../../middleware/AuthMiddleware.js";
import { roleAccess } from "../../middleware/roleAccess.middleware.js";
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
  roleAccess("seller"),
  deActivateProjectService
);

export default router;
