import ApiError from "./apiError.midllware.js";

export const globelErrorHandler = (err, req, res, next) => {
  console.error("Global Error Handler:", err);

  // if (err instanceof ApiError) {
  //   return res.status(err.statusCode).json({
  //     success: false,
  //     message: err.message,
  //   });
  // }
  console.log(err);

  res.status(err.status || 500).json({
    success: false,
    message: err || "Internal Server Error",
  });
};
