'use strict';

const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid/v4');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const JSON_PATH = path.join(__dirname, '../../data.json');

class MoviesModel {
  constructor(jsonPath = JSON_PATH) {
      this.jsonPath = jsonPath;
  }

  async getList() {
      const fileContent = await readFile(this.jsonPath);

      return (
        JSON.parse(fileContent)
          .sort((film1, film2) => Number(film1.year) - Number(film2.year))
      );
  }

  async getMovieById(id) {
    const fileContent = await readFile(this.jsonPath);

    return JSON.parse(fileContent).find(item => item.id === id);
  }

  async getMoviesTitles(year) {
    const fileContent = await readFile(this.jsonPath);

    const filmsTitles = year 
      ? JSON.parse(fileContent)
          .filter(film => film.year === year)
          .map(film => film.title) 
      : JSON.parse(fileContent)
          .map(film => film.title);
    
    return filmsTitles.sort((a, b) => a.localeCompare(b)).join('\n');
  }

  async addMovie(newMovie) {
    const { title, year, imdbRating } = newMovie;
    const movie = {
      imdbRating,
      title,
      year,
      id: uuidv4()
    }

    const fileContent = await readFile(this.jsonPath);

    await writeFile(
      this.jsonPath, 
      JSON.stringify([...JSON.parse(fileContent), movie], null, 2)
      );
    
    return movie;
  }

  async changeMovie(id, newDetails) {
    const {title, year, imdbRating} = newDetails;

    const fileContent = await readFile(this.jsonPath);

    const findMovie = JSON.parse(fileContent).find(film => film.id === id);
    
    if (findMovie) {
      const chagedMovie = {
        imdbRating: imdbRating || findMovie.imdbRating,
        title: title || findMovie.title,
        year: year || findMovie.year,
        id
      }

      await writeFile(
        this.jsonPath, 
        JSON.stringify(
          [
            ...JSON.parse(fileContent).filter(film => film.id !== id), 
            chagedMovie,
          ], null, 2));
      
      return chagedMovie;
    } 
  }

  async deleteMovie(id) {
    const fileContent = await readFile(this.jsonPath);

    const findMovie = JSON.parse(fileContent).find(film => film.id === id);
    
    if (findMovie) {
      await writeFile(
        this.jsonPath, 
        JSON.stringify(
          JSON.parse(fileContent).filter(film => film.id !== id), null, 2));
    }
  }
}

const moviesModel = new MoviesModel();

module.exports = moviesModel;
