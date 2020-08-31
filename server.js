const express = require('express');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

const urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com',
};

app.get('/', (req, res) => {
  res.render('hello');
});

app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

app.get('/urls/:shortURL', (req, res) => {
  const { params } = req;
  const templateVars = { shortURL: params.shortURL, longURL: params.longURL };
  res.render('urls_show', templateVars);
});

app.listen(PORT, () => {
  `Server listening on port: ${PORT}`;
});
