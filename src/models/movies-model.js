'use strict';

const db = require('../db');

class MoviesModel {

  async getList() {
      const query = {
        text: 'SELECT * FROM movie ORDER BY year ASC;',
        values: [],
      }
      const res = await db.query(query);

      return res.rows;
  }

  async getMovieById(id) {
    const query = {
      text: 'SELECT * FROM movie WHERE id = $1;',
      values: [id],
    };
    const res = await db.query(query);

    return res.rows[0];
  }

  async getMoviesTitles(year) {
    const yearString = year ? 'WHERE year = $1' : '';
    const query = {
      text: `SELECT title FROM movie ${yearString} ORDER BY year ASC;`,
      values: year ? [year]: [],
    };
    const res = await db.query(query);

    return res.rows.map(item => item.title).join('\n');
  }

  async addMovie(newMovie) {
    const { title, year, imdbRating } = newMovie;
    const query = {
      text: 'INSERT INTO movie(title, year, imdbrating) VALUES($1, $2, $3) RETURNING *;',
      values: [title, year, imdbRating],
    }

    const res = await db.query(query);
    return res.rows[0];
  }

  async changeMovie(id, newDetails) {
    const {title, year, imdbRating} = newDetails;
    const queryFind = {
      text: 'SELECT * FROM movie WHERE id = $1;',
      values: [id],
    };
    const foundMovie = await db.query(queryFind);

    if (foundMovie) {
      const chagedMovie = {
        imdbRating: imdbRating || foundMovie.rows[0].imdbrating,
        title: title || foundMovie.rows[0].title,
        year: year || foundMovie.rows[0].year,
      }

      const queryUpdate = {
        text: 'UPDATE movie SET imdbrating= $2, title = $3, year = $4 WHERE id = $1 RETURNING *;',
        values: [id, chagedMovie.imdbRating, chagedMovie.title, chagedMovie.year],
      };

      const res = await db.query(queryUpdate);
      return res.rows[0]
    }
  }

  async deleteMovie(id) {
    const queryFind = {
      text: 'SELECT * FROM movie WHERE id = $1;',
      values: [id],
    };
    const queryDelete = {
      text: 'DELETE FROM movie WHERE id = $1;',
      values: [id],
    };

    const foundMovie = await db.query(queryFind);
    
    if (foundMovie) {
      await db.query(queryDelete);
    }
  }
}

const moviesModel = new MoviesModel();

module.exports = moviesModel;
