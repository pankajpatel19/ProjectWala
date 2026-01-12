import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "15min" });
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export { generateToken, verifyToken };
