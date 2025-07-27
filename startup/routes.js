
const express = require('express');
const auth = require('../routes/auth.route.js');
const movie = require('../routes/movies.route.js');
const error = require('../middleware/error.js');

module.exports = function(app){
  app.use(express.json());
  app.use("/api/auth/",auth);
  app.use("/api/movie/",movie);
  app.use(error);
}