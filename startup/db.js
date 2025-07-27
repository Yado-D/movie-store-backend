const mongoose = require("mongoose");
const {logger} = require("../logger");

module.exports = function (){
  mongoose
    .connect("mongodb://localhost:27017/playground")
    .then(() => logger.info("Connceted to Darabase..."));

};
