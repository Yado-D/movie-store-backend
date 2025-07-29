const asyncMiddleware = require("../middleware/async");
const Joi = require("joi");
const movieDebuger = require("debug")("app:movie");
const Movies = require("../models/movie.model");
const mongoose = require("mongoose");

const postMovies = asyncMiddleware(async (req, res) => {
  //validate using joi
  const { error, value } = validateMovie(req);

  if (error) throw new Error("please input valid required fields.");
  movieDebuger("validation of movie result : ", value);
  //check if it is unique movie
  const movie = await Movies.findOne({ title: req.body.title });
  movieDebuger("movie : ", movie);
  //respond to resolve or error
  if (movie)
    throw new Error("The movie With this title is already registered.");
  //upload the movie to mongo
  const uploadedMovie = new Movies({
    title: req.body.title,
    description: req.body.description,
    genre: req.body.genre,
    createdBy: req.body.createdBy,
    releasedYear: req.body.releasedYear,
  });
  const result = await uploadedMovie.save();
  //send upload movie data
  res.send(result);
});

//get all movies

const getAllMovies = asyncMiddleware(async (req, res) => {
  movieDebuger("Getting all the movie ...");
  const movies = await Movies.find();
  movieDebuger("All movies : ", movies);

  //send movie data
  res.send(movies);
});

const getMovieById = asyncMiddleware(async (req, res) => {
  const movieId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(movieId))
    throw new Error("The movie id is not valid.");

  const movie = await Movies.findById(movieId);

  if (!movie) {
    throw new Error("Movie not found.");
  }

  res.status(200).json(movie);
});

const editMovieData = asyncMiddleware(async (req, res) => {
  //select only valid values
  const { title, description, releasedYear, genre } = req.body;
  var patch = {};

  if (title !== undefined) patch.title = title;
  if (description !== undefined) patch.description = description;
  if (releasedYear !== undefined) patch.releasedYear = releasedYear;
  if (genre !== undefined) patch.genre = genre;

  const updated = await Movies.findByIdAndUpdate(
    req.params.id,
    { $set: patch },
    { new: true, runValidators: true }
  );

  if (!updated) throw new Error("Movie not found.");

  res.status(200).json(updated);
});

const deleteMovieData = asyncMiddleware(async (req, res) => {
  //select movie id
  const movieId = req.params.id;

  const deleted = await Movies.findByIdAndDelete(movieId);

  if (!deleted) throw new Error("Movie not deleted,please try again.");

  res.status(200).send("The Movie data deleted successfully.");
});

//validator of the movie

function validateMovie(req) {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    genre: Joi.string().min(5).required(),
    description: Joi.string().min(3).required(),
    releasedYear: Joi.date().required(),
    createdBy: Joi.string().min(3).required(),
  });
  // movieDebuger(" movie result : ",req.body);
  return schema.validate(req.body);
}

exports.postMovies = postMovies;
exports.getAllMovies = getAllMovies;
exports.getMovieById = getMovieById;
exports.editMovieData = editMovieData;
exports.deleteMovieData = deleteMovieData;
