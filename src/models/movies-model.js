'use strict';

const db = require('../db');

class MoviesModel {

  async getList(sortedBy, year) {
    const stringYear = year ? 'whERE year = $1' : '';
    const query = {
      text: `SELECT * FROM movie ${stringYear} ORDER BY ${sortedBy} ASC;`,
      values: year ? [year] : [],
    }
      const res = await db.query(query);

      return res.rows;
  }

  async getMovieById(id) {
    const query = {
      text: `SELECT * FROM movie WHERE id = $1;`,
      values: [id],
    };
    const res = await db.query(query);

    return res.rows[0];
  }

  async getMoviesTitles(year) {
    
    const res = await this.getList('title', year);

    return res.map(item => item.title).join('\n');
  }

  async addMovie(newMovie) {
    const { title, year, imdbRating } = newMovie;
    const query = {
      text: 'INSERT INTO movie(title, year, imdbrating) VALUES($1, $2, $3) RETURNING *;',
      values: [title, year, imdbRating],
    };

    const res = await db.query(query);

    return res.rows[0];
  }

  async changeMovie(id, newDetails) {
    const queryFind = {
      text: 'SELECT * FROM movie WHERE id = $1;',
      values: [id],
    };
    const foundMovie = await db.query(queryFind);

    const chagedMovie = {
      ...foundMovie.rows[0],
      ...newDetails
      };
    
    const queryUpdate = {
      text: 'UPDATE movie SET imdbrating = $2, title = $3, year = $4 WHERE id = $1 RETURNING *;',
      values: [id, chagedMovie.imdbrating, chagedMovie.title, chagedMovie.year],
    };

    const res = await db.query(queryUpdate);

    return res.rows[0]
  }

  async deleteMovie(id) {
    const queryDelete = {
      text: 'DELETE FROM movie WHERE id = $1;',
      values: [id],
    };
    
    await db.query(queryDelete);
  }
}

const moviesModel = new MoviesModel();

module.exports = moviesModel;
