const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET route at the root of the app
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET route for retrieving data
app.get('/data', (req, res) => {
  res.json({ message: 'This is your data' });
});

// POST route for creating data
app.post('/data', (req, res) => {
  console.log(req.body); // Log the request body to the console
  res.status(201).send('Data created');
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
