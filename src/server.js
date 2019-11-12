const express = require('express');
const fs = require('fs');
const server = express();
const port = 4000;

server.get(`/movies`, (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if(err) {
        console.error(404);
    } else {
        const sortMovies = JSON.parse(data)
          .sort((film1, film2) => (
            Number(film1.year) - Number(film2.year)
          ));
        res.end(JSON.stringify(sortMovies, null, 2));
    }
  });
});

server.get('/movies/titles', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if(err) {
      console.error(404);
    } else {
      const titles = JSON.parse(data)
      .map(movie => movie.title)
      .sort();
      res.end(titles.join('\n'));
    }
  })
});

server.listen(port, () => console.log('listening...'))
