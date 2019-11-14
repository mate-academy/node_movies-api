'use strict'

const moviesModel = require('../models/movies-model');

exports.viewAllMovies = (req, res) => {
  moviesModel.getList()
  .then(data => res.json(data))
  .catch(
    err => (
      res
      .status(500)
      .json({ 
        statusCode: 500, 
        error: err, 
        errorDescription: 'Error read file data.json',
      })
    )
  );
}

exports.viewMovieById = (req, res) => {
  const { filmId } = req.params;

  moviesModel.getMovieById(filmId)
  .then(data => {
    if(data) {

      return res.json(data);
    } else {

      return (
        res
        .status(404)
        .json({ 
          statusCode: 404, 
          error: null, 
          errorDescription: 'Error films id not found' 
        })
      );
    }
  })
  .catch(
    err => (
      res
      .status(500)
      .json({ 
        statusCode: 500, 
        error: err, 
        errorDescription: 'Error read file data.json',
      })
    )
  );
}

exports.viewTitles = (req, res) => {
  const { year } = req.query;
  
  moviesModel.getMoviesTitles(year)
  .then(data => res.send(data))
  .catch(
    err => (
      res
      .status(500)
      .json({ 
        statusCode: 500, 
        error: err, 
        errorDescription: 'Error read file data.json',
      })
    )
  );
}

exports.createMovie = (req, res) => {
  const contentType = req.headers['content-type'];

  if(contentType !== 'application/json') {
    res.status(400).json({
      code: 400,
      error: null,
      errorDescription: 'Not JSON'
    });
  }
  
  moviesModel.addMovie(req.body)
  .then(data => res.json(data))
  .catch(
    err => (
      res
      .status(500)
      .json({ 
        statusCode: 500, 
        error: err, 
        errorDescription: 'Error write data to data.json',
      })
    )
  );
}

exports.changeMovies = (req, res) => {
  const contentType = req.headers['content-type'];

  if(contentType !== 'application/json') {
    res.status(400).json({
      code: 400,
      error: null,
      errorDescription: 'Not JSON'
    });
  }

  const { filmId } = req.params;

  moviesModel.changeMovie(filmId, req.body)
  .then(data => {
    if(data) {

      return res.json(data);
    } else {

      return (
        res
        .status(404)
        .json({ 
          statusCode: 404, 
          error: null, 
          errorDescription: 'Error films id not found' 
        })
      );
    }
  })
  .catch(
    err => (
      res
      .status(500)
      .json({ 
        statusCode: 500, 
        error: err, 
        errorDescription: 'Error write data to data.json',
      })
    )
  );
}

exports.deleteMovie = (req, res) => {
  const { filmId } = req.params;

  moviesModel.deleteMovie(filmId)
  .then(() => res.sendStatus(204))
  .catch(
    err => (
      res
      .status(500)
      .json({ 
        statusCode: 500, 
        error: err, 
        errorDescription: 'Error write data to data.json',
      })
    )
  );
}
