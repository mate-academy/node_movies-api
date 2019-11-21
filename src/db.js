const { Pool } = require('pg');
const connectionString = 'postgresql://movie_user:qwerty12345@localhost:5432/movies_db';

const pool = new Pool({
  connectionString
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}
