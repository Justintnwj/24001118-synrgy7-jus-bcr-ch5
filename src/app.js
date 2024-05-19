const express = require('express');
const cors = require('cors');
const app = express();
const port = 3003;

app.use(cors());
app.use(express.json());

// Import routes
const carRoutes = require('./routers/cars');
const orderRoutes = require('./routers/listorders');

// Use routes
app.use('/cars', carRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});