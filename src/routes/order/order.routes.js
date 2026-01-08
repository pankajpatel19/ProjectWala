import { Router } from "express";
import { authMiddleware } from "../../middleware/AuthMiddleware.js";
import { roleAccess } from "../../middleware/roleAccess.middleware.js";
import {
  checkOut,
  downloadProject,
} from "../../controllers/order/order.controller.js";
import { isPurchased } from "../../middleware/isPurchased.js";
const router = Router();

router.post("/create-order", authMiddleware, roleAccess("user"), checkOut);
router.get(
  "/download/:projectId",
  authMiddleware,
  roleAccess("user"),
  isPurchased,
  downloadProject
);
export default router;
