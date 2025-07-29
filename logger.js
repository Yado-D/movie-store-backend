const winston = require("winston");
require('winston-mongodb');

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
      new winston.transports.MongoDB({ db: "mongodb://localhost/playground" }),
    ],
  });

exports.logger = logger;