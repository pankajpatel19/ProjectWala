import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connectDB from "./config/db.config.js";
import userRoutes from "./routes/user/user.routes.js";
import { globelErrorHandler } from "./middleware/globelError.handler.middleware.js";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use(cookieParser());
//--- IGNORE ---Routes
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(globelErrorHandler);

export { app, PORT };
