const mongoose = require("mongoose");
const { logger } = require("../logger");
const config = require("config");

module.exports = function () {
  mongoose
    .connect(config.get("db"))
    .then(() => logger.info(`Connceted to ${config.get("db")}...`));
};
