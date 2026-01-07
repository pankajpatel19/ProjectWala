class ApiError extends Error {
  constructor(parameters) {
    super(parameters);
    this.statusCode = parameters.statusCode;
    this.message = parameters.message;
    this.isOperational = parameters.isOperational || true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
