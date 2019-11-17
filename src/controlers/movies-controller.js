'use strict';

const moviesModel = require('../models/movies-model');
const { hadleError } = require('../hadleError');

exports.viewAllMovies = (req, res) => {
  moviesModel.getList()
    .then(data => res.json(data))
    .catch(err => hadleError(res, 500, err));
}

exports.viewMovieById = (req, res) => {
  const { filmId } = req.params;

  moviesModel.getMovieById(filmId)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        hadleError(res, 404, 'Movie id do not found ');
      }
    })
    .catch(err => hadleError(res, 500, err));
}

exports.viewTitles = (req, res) => {
  const { year } = req.query;
  
  moviesModel.getMoviesTitles(year)
    .then(data => res.send(data))
    .catch(err => hadleError(res, 500, err));
}

exports.createMovie = (req, res) => {
  moviesModel.addMovie(req.body)
    .then(data => res.json(data))
    .catch(err => hadleError(res, 500, err));
}

exports.changeMovie = (req, res) => {
  const { filmId } = req.params;

  moviesModel.changeMovie(filmId, req.body)
    .then(data => {
      if (data) {
        res.json(data);
      } else {
        hadleError(res, 404, 'Movie id do not found ');;
      }
    })
    .catch(err => hadleError(res, 500, err));
}

exports.deleteMovie = (req, res) => {
  const { filmId } = req.params;

  moviesModel.deleteMovie(filmId)
    .then(() => res.sendStatus(204))
    .catch(err => hadleError(res, 500, err));
}
