const express = require('express');
const fs = require('fs');

const server = express();
const port = 4000;

server.get(`/movies`, (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if(err) {
      res.sendStatus(500);
    } else {
      const sortMovies = JSON.parse(data)
        .sort((film1, film2) => (
          Number(film1.year) - Number(film2.year)
        ));

      res.send(sortMovies);
    }
  });
});

server.get('/movies/titles', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if(err) {
      res.sendStatus(500);
    } else {
      let films = JSON.parse(data);

      if (req.query.year) {
        films = films.filter(film => film.year === req.query.year);
      }

      if (!films.length) {
        res.status(404).send("Title not found");
      } else {
        res.send(films
          .map(movie => movie.title)
          .sort()
          .join('\n')
        );
      }
    }
  })
});

server.get('/movies/:id', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if(err) {
      res.sendStatus(500);
    } else {
      const film = JSON.parse(data)
      .find(movie => movie.id === req.params.id)

      if (film) {
        res.send(film);
      } else {
        res.status(404).send(`can't find film by id = ${req.params.id}`);
      }
    }
  });
})

server.listen(port, () => console.log('listening...'))
