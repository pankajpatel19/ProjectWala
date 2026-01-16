import { Router } from "express";
import passport from "passport";
import {
  currentUser,
  getAllUsers,
  login,
  signup,
} from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { roleAccess } from "../middleware/roleAccess.middleware.js";
import { sellerStatus } from "../controllers/seller.controller.js";
import { loginLimiter } from "../rateLimiter/rateLimiter.js";

const router = Router();

router.post("/signup", signup);
router.post("/login", loginLimiter, login);
router.get("/current-user", authMiddleware, roleAccess("user"), currentUser);
router.get("/all-users", authMiddleware, roleAccess("admin"), getAllUsers);
router.get("/seller-status/:id", authMiddleware, sellerStatus);

export default router;
