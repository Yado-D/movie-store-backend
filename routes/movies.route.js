const express = require("express");
const router = express.Router();
const authorization = require('../middleware/authorization.middleware');
const {
  postMovies,
  getAllMovies,
  getMovieById,
  editMovieData,
  deleteMovieData
} = require("../controllers/movies.controller");

router.post("/",authorization,postMovies);

router.get("/", getAllMovies);

router.get("/:id", getMovieById);

router.put("/:id",authorization, editMovieData);

router.delete("/:id",authorization, deleteMovieData);


module.exports = router;
