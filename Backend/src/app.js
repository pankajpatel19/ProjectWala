import dotenv from "dotenv";
dotenv.config();
import session from "express-session";
import express from "express";
import connectDB from "./config/db.config.js";
import userRoutes from "./routes/user.routes.js";
import ProjectRoutes from "./routes/project.routes.js";
import orderRoutes from "./routes/order.routes.js";
import { globelErrorHandler } from "./middleware/globelError.handler.middleware.js";
import cookieParser from "cookie-parser";
import "./utils/OAuth.js";
import passport from "passport";
import helmet from "helmet";
import morgan from "morgan";
import { limiter } from "./rateLimiter/rateLimiter.js";
import jwt from "jsonwebtoken";

import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(helmet());
app.use(morgan("dev"));
app.use("/api", limiter);
// app.use(mongoSanitize());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ limit: "10kb" }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/auth/google", (req, res, next) => {
  const role = req.query.role || "user";
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: role, // Pass role here so Google returns it in req.query.state
  })(req, res, next);
});

app.get(
  "/api/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const user = req.user;

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    };
    res.cookie("token", token, options);

    res.redirect("http://localhost:5173/projects");
  }
);
app.use("/api/users", userRoutes);
app.use("/api/projects", ProjectRoutes);
app.use("/api/orders", orderRoutes);

app.use(globelErrorHandler);

export { app, PORT };
