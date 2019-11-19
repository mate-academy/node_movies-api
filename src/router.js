'use strict';

const router = require('express').Router();
const parseJson = require('express').json();

const { checkContentType } = require('./middleware'); 
const controlerMovies = require('./controlers/movies-controller');

router.route('/')
  .get(controlerMovies.viewAllMovies)
  .post(checkContentType, parseJson, controlerMovies.createMovie);

router.route('/titles')
  .get(controlerMovies.viewTitles);

router.route('/:filmId')
  .get(controlerMovies.viewMovieById)
  .post(checkContentType, parseJson, controlerMovies.changeMovie)
  .patch(checkContentType, parseJson, controlerMovies.changeMovie)
  .delete(controlerMovies.deleteMovie);

module.exports = router;
