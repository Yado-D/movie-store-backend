const { logger } = require('../logger.js');

module.exports = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack });

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong.';

  // Handle Mongo duplicate key error
  if (err.code === 11000) {
    statusCode = 409;
    const duplicateField = Object.keys(err.keyValue)[0];
     message = `A record with that ${duplicateField} already exists.`;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};