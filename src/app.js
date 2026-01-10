import dotenv from "dotenv";
dotenv.config();

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
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(morgan("dev"));
app.use("/api", limiter);
// app.use(mongoSanitize());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(passport.initialize());
app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

//--- IGNORE ---Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.use("/api/users", userRoutes);
app.use("/api/projects", ProjectRoutes);
app.use("/api/orders", orderRoutes);

app.use(globelErrorHandler);

export { app, PORT };
