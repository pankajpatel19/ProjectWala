import { Router } from "express";
import upload from "../middleware/multer.middleware.js";
import {
  createProjectService,
  getAllProjectsService,
  deActivateProjectService,
  getProjectForUserService,
} from "../../controllers/project/project.controller.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { roleAccess } from "../middleware/roleAccess.middleware.js";
import { isOwner } from "../middleware/isOwner.middleware.js";
import { getSellerProjects } from "../../controllers/user/seller.controller.js";
import { checkUserBeforePost } from "../middleware/checkUserBeforePost.js";
import { postCommentService } from "../../controllers/review/review.controller.js";
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

router.get("/getProjects/:id", authMiddleware, getSellerProjects);
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

router.post(
  "/projects/:id/post-comment",
  authMiddleware,
  roleAccess,
  checkUserBeforePost,
  postCommentService
);
// router.get(
//   "/filter-projects?category=&techStack=&price=&skip=",
//   authMiddleware,
//   roleAccess("user"),
//   projectFilterService
// );
export default router;
