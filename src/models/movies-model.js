const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const JSON_PATH = path.join(__dirname, '../../data.json');
const readFile = promisify(fs.readFile);

class MoviesModel{
  constructor(jsonPath = JSON_PATH) {
    this.jsonPath = jsonPath;
  }

  async getList() {
    const fileContent = await readFile(this.jsonPath); 

    return JSON.parse(fileContent)
      .sort((film1, film2) => (
        Number(film1.year) - Number(film2.year)
      ));
  }

  async getMovieById(id) {
    const fileContent = await readFile(this.jsonPath); 
    
    return JSON.parse(fileContent)
    .find(movie => movie.id === id)
  }

  async getTitles(year) {
    const movies = await this.getList();
    const filteredMovies = year 
    ? movies.filter(movie => year === movie.year) 
    : movies;

    return filteredMovies
      .map(({title}) => title)
      .join('\n');
  }
}

const moviesModel = new MoviesModel();

module.exports = moviesModel;