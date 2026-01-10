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

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(passport.initialize());
app.use(express.json());
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
