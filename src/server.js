const express = require('express');
const moviesController = require('./controllers/movies-controller');

const server = express();
const port = process.env.PORT || 4000;

server.get(`/movies`, moviesController.get);
server.get('/movies/titles', moviesController.getTitles);
server.get('/movies/:id', moviesController.getById);

server.listen(port, () => console.log(`listening on port ${port}...`))
