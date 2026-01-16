import { mongoose, Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    googleId: { type: String, unique: true, sparse: true, default: null },
    password: {
      type: String,
    },
    avatar: String,
    role: {
      type: String,
      enum: ["user", "seller"],
      default: "user",
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  // Hash password before saving (implementation not shown)
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.correctPassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
