import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpMutate } from "@/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { signupValidation } from "@/validation/auth";

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(signupValidation),
  });
  const { mutate, data, isSuccess } = useSignUpMutate();

  const onSubmit = (formData) => {
    mutate(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <ToastContainer />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-center text-gray-800 mb-6"
        >
          Sign Up
        </motion.h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <motion.div variants={itemVariants}>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your name"
              {...register("name", { required: "UserName is required" })}
            />
            {errors?.name && (
              <span className="m-2 text-red-600">{errors.name.message}</span>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors?.email && (
              <span className="m-2 text-red-600">{errors.email.message}</span>
            )}
          </motion.div>

          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Create a password"
              {...register("password")}
            />
            {errors?.password && (
              <span className="m-2 text-red-600">
                {errors.password.message}
              </span>
            )}
          </motion.div>
          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="ConfirmPassword"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Create a password"
              {...register("ConfirmPassword")}
            />
            {errors?.ConfirmPassword && (
              <span className="m-2 text-red-600">
                {errors.ConfirmPassword.message}
              </span>
            )}
          </motion.div>

          {/* Role Field */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
              {...register("role")}
            >
              <option value="user">User</option>
              <option value="seller">Seller</option>
            </select>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Sign Up
          </motion.button>
        </form>

        <motion.p
          variants={itemVariants}
          className="text-center text-sm text-gray-600 mt-6"
        >
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Sign In
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}

export default SignUp;
