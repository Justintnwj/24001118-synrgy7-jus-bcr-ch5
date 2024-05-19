const express = require('express');
const router = express.Router();
const db = require('../../config/config.js');

// Get all cars
router.get('/', (req, res) => {
  db.query('SELECT * FROM cars', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results.rows);
  });
});

// Create a new car
router.post('/', (req, res) => {
  const { name, category, price, start_rent, finish_rent, created_at, updated_at } = req.body;
  const query = 'INSERT INTO cars (name, category, price, start_rent, finish_rent, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)';
  db.query(query, [name, category, price, start_rent, finish_rent, created_at, updated_at], (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Error inserting data');
      return;
    }
    console.log('Data inserted successfully');
    res.status(201).send('Data Berhasil Disimpan');
  });
});


// Edit a car
router.put('/:name', (req, res) => {
  const { name } = req.params;
  const { category, price, start_rent, finish_rent } = req.body;
  const query = 'UPDATE cars SET category = $1, price = $2, start_rent = $3, finish_rent = $4, updated_at = CURRENT_TIMESTAMP, created_at = CURRENT_TIMESTAMP WHERE name = $5';
  db.query(query, [category, price, start_rent, finish_rent, name], (err, results) => {
    if (err) {
      res.status(500).send('Error updating data');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Car not found');
      return;
    }
    res.status(200).send('Data Berhasil Diedit');
  });
});

// Delete a car
router.delete('/:name', (req, res) => {
  const { name } = req.params;
  const query = 'DELETE FROM cars WHERE name = $1';
  db.query(query, [name], (err, results) => {
    if (err) {
      res.status(500).send('Error deleting data');
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).send('Car not found');
      return;
    }
    res.status(200).send('Data Berhasil Dihapus');
  });
});

module.exports = router;