import { Router } from "express";
import {
  currentUser,
  getAllUsers,
  login,
  signup,
} from "../../controllers/user/auth.controller.js";
import { authMiddleware } from "../../middleware/AuthMiddleware.js";
import { roleAccess } from "../../middleware/roleAccess.middleware.js";
import { sellerStatus } from "../../controllers/user/seller.controller.js";

const router = Router();

const allowroles = ["admin", "user"]; // Example roles array
router.post("/signup", signup);
router.post("/login", login);
router.get("/current-user", authMiddleware, roleAccess("user"), currentUser);
router.get("/all-users", authMiddleware, roleAccess("admin"), getAllUsers);
router.get("/seller-status/:id", authMiddleware, sellerStatus);

export default router;
