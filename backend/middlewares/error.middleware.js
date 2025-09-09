// error.middleware.js

// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message: message,
    // Optional: include stack trace in development
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;
