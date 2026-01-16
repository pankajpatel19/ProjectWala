import User from "../models/user.model.js";
import ApiError from "../middleware/apiError.midllware.js";
import { generateToken } from "../utils/jwt/jwtToken.js";

class AuthService {
  async signup({ name, email, password, role }) {
    const exist = await User.findOne({ email });
    console.log(name, email, role);

    if (exist) {
      throw new ApiError(400, "User already exists");
    }
    const user = new User({ name, email, password, role });
    await user.save();

    return user;
  }

  async login({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const isCorrectPassword = await user.correctPassword(password);

    if (!isCorrectPassword) {
      throw new ApiError(401, "Invalid credentials");
    }
    const token = generateToken({ id: user._id, role: user.role });

    return { user, token };
  }

  async currentUser(userId) {
    const user = await User.findById(userId).select("-password -balance");
    return user;
  }

  async getAllUsers() {
    const users = await User.find();
    return users;
  }
}

export default new AuthService();
