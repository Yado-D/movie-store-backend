const { logger } = require("../logger");

module.exports = function () {
  process.on("unhandledRejection", (ex) => {
    logger.error("unhandled Exception - ", ex.Error);
    throw new Error(ex);
  });
  process.on("uncaughtExceptions", (ex) => {
    logger.error("uncaught Exception - ", ex.Error);
    throw new Error(ex);
  });
};
