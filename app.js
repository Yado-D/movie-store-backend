const express = require("express");
const app = express();

require('./startup/routes.js')(app); //middleware routes
require("./startup/db.js")(); //mongodb connect
require('./startup/logging.js')();
require('./startup/prod.js')(app);

const PORT = process.env.PORT ?? 3000;

const server = app.listen(PORT,console.log(`Server is listenning on port ${PORT}...`));
module.exports = server;