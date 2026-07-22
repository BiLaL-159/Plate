function notFound(req, _res, next) {
  const error = new Error(`Cannot ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

function errorHandler(error, _req, res, _next) {
  let statusCode = error.statusCode || 500;
  let message = error.message;

  if (error.code === 11000) {
    statusCode = 409;
    message = 'Email is already registered';
  }

  if (statusCode >= 500) {
    console.error(error);
  }

  const response = {
    message: statusCode >= 500 ? 'Internal server error' : message,
  };

  if (error.details) {
    response.details = error.details;
  }

  res.status(statusCode).json(response);
}

module.exports = {
  notFound,
  errorHandler,
};
