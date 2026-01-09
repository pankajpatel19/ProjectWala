import { Router } from "express";
import passport from "passport";
import {
  currentUser,
  getAllUsers,
  login,
  signup,
} from "../../controllers/user/auth.controller.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { roleAccess } from "../middleware/roleAccess.middleware.js";
import { sellerStatus } from "../../controllers/user/seller.controller.js";

const router = Router();

const allowroles = ["admin", "user"]; // Example roles array
router.post("/signup", signup);
router.post("/login", login);
router.get("/current-user", authMiddleware, roleAccess("user"), currentUser);
router.get("/all-users", authMiddleware, roleAccess("admin"), getAllUsers);
router.get("/seller-status/:id", authMiddleware, sellerStatus);

router.get("/google", (req, res, next) => {
  const role = req.query.role || "user";
  passport.authenticate("google", { scope: ["profile", "email"], state: role })(
    req,
    res,
    next
  );
});

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // 3. Generate JWT for the user
    const token = jwt.sign(
      { id: req.user._id, role: req.user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const frontUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    };

    // 4. Redirect to Frontend with token (ya cookie set karo)
    res.cookie("token", token, options).redirect(`${frontUrl}/auth-success`);
  }
);
export default router;
