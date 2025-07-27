const express = require("express");
const app = express();

require('./startup/routes.js')(app); //middleware routes
require('./logger.js'); //logger winston loader
require("./startup/db.js")(); //mongodb connect



const PORT = process.env.PORT ?? 3000;

app.listen(PORT,console.log(`Server is listenning on port ${PORT}...`));
