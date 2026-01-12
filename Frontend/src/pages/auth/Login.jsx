import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

function Login() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (formData) => {
    console.log("Login submitted:", formData);
    alert(`Welcome back!`);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">Sign in to your account</p>
        </motion.div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your email"
              {...register("email")}
            />
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
              {...register("password")}
            />
          </motion.div>

          {/* Forgot Password */}
          <motion.div variants={itemVariants} className="text-right">
            <a
              href="#"
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Forgot Password?
            </a>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-xl"
          >
            Sign In
          </motion.button>
        </form>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Sign Up
            </a>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Login;
