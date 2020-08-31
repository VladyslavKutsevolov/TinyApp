const express = require('express');

const app = express();
const PORT = 3000;

const urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com',
};

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/url.json', (req, res) => {
  res.json(urlDatabase);
});

app.listen(PORT, () => {
  `Server listening on port: ${PORT}`;
});
