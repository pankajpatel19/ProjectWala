import { Router } from "express";
import upload from "../../middleware/multer.middleware.js";
import { createProjectService } from "../../controllers/project/project.controller.js";
import { authMiddleware } from "../../middleware/AuthMiddleware.js";
const router = Router();

router.post(
  "/upload-project",
  authMiddleware,
  upload.single("projectImage"),
  createProjectService
);
export default router;
