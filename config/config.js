const pg = require('pg');

const pool = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'binarch5',
  password: '123456',
  port: 5432,
  schema: 'public'
});

pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
  release();
});


module.exports = pool;
