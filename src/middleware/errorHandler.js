const AppError = require('../utils/AppError');

const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  // Prisma known errors
  if (err.code === 'P2002') {
    statusCode = 409;
    message = 'Duplicate field value entered';
  } else if (err.code === 'P2025') {
    statusCode = 404;
    message = 'Record not found';
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message: message || 'Internal Server Error',
  });
};

module.exports = errorHandler;