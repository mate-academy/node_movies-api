'use strict'

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.get('/movies', (req, res) => {
  fs.readFile(path.join(__dirname, '../data.json'), (err, content) => {
    if (err) {
      res.status(500).json({
        statusCode: 500,
        errorMessage: err,
        errorDescription: 'Error read file data.json',
      });
    } else {
      const films = JSON.parse(content);
      res.json(
        films.sort((a, b) => Number(a.year) - Number(b.year))
      );
    }
  });
});

app.get('/movies/titles', (req, res) => {
  const { year } = req.query;
  
  fs.readFile(path.join(__dirname, '../data.json'), (err, content) => {
    if (err) {
      res.status(500).json({
        statusCode: 500,
        error: err,
        errorDescription: 'Error read file data.json',
      });
    } else {
      const filmsTitles = year 
      ? JSON.parse(content)
        .filter(film => film.year === year)
        .map(film => film.title) 
      : JSON.parse(content)
        .map(film => film.title);
      
      res.send(
        filmsTitles
        .sort((a, b) => a.localeCompare(b))
        .map(title => title).join('\n')
      );
    }
  });

});

app.get('/movies/:filmId', (req, res) => {
  const { filmId } = req.params;

  fs.readFile(path.join(__dirname, '../data.json'), (err, content) => {
    if (err) {
      res.status(500).json({
        statusCode: 500,
        error: err,
        errorDescription: 'Error read file data.json',
      });
    } else {
      const films = JSON.parse(content);
      const film = films.find(item => item.id === filmId);
      
      if (film) {
        res.json(film)
      } else {
        res.status(404).json({
          statusCode: 404,
          error: err,
          errorDescription: 'Error films id not found',
        });
      }
    }
  });
});


app.listen(port, () => console.log(`Start server on port ${port}`));
