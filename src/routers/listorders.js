const express = require('express');
const router = express.Router();
const db = require('../../config/config.js');

// Get all orders
router.get('/', (req, res) => {
  db.query('SELECT * FROM listorder', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching data');
      return;
    }
    res.json(results.rows);
  });
});

module.exports = router;