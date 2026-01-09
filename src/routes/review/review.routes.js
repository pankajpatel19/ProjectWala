import { Router } from "express";
import { authMiddleware } from "../../middleware/AuthMiddleware.js";
import { roleAccess } from "../../middleware/roleAccess.middleware.js";
import { checkUserBeforePost } from "../../middleware/checkUserBeforePost.js";
import { postCommentService } from "../../controllers/review/review.controller.js";

const router = Router();

router.post(
  "/post-comment",
  authMiddleware,
  roleAccess,
  checkUserBeforePost,
  postCommentService
);

export default router;
