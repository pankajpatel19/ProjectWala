import authService from "../services/auth.service.js";
import { catchAsync } from "../middleware/catchAsync.middleware.js";

export const signup = catchAsync(async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await authService.signup({ name, email, password, role });

    res.status(201).json({ message: "User Registered" });
  } catch (error) {
    console.log(error);

    next(error.message);
  }
});

export const login = catchAsync(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV !== "production",
      sameSite: "None",
    };

    res
      .status(200)
      .cookie("token", token, options)
      .json({ message: "Login SuccessFully" });
  } catch (error) {
    console.log(error);
    next(error.message);
  }
});

export const currentUser = catchAsync(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await authService.currentUser(userId);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(error.message);
  }
});

export const getAllUsers = catchAsync(async (req, res, next) => {
  try {
    const users = await authService.getAllUsers();
    res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    next(error.message);
  }
});
