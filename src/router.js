'use strict'

const router = require('express').Router();
const parseJson = require('express').json();

const controlerMovies = require('./controlers/movies-controller');

router.route('/movies')
  .get(controlerMovies.viewAllMovies)
  .post(parseJson, controlerMovies.createMovie);

router.route('/movies/titles')
  .get(controlerMovies.viewTitles);

router.route('/movies/:filmId')
  .get(controlerMovies.viewMovieById)
  .post(parseJson, controlerMovies.changeMovies)
  .patch(parseJson, controlerMovies.changeMovies)
  .delete(parseJson, controlerMovies.deleteMovie);

module.exports = router;
