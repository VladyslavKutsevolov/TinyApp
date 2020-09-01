const express = require('express');
const { generateRandSring } = require('./utils');

const app = express();
const PORT = 3000;

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

const urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com',
};

app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.post('/urls', (req, res) => {
  console.log(req.body);
  res.send('ok');
});

app.get('/urls/:shortURL', (req, res) => {
  const { params } = req;
  const templateVars = { shortURL: params.shortURL, longURL: params.longURL };
  res.render('urls_show', templateVars);
});

app.listen(PORT, () => {
  `Server listening on port: ${PORT}`;
});
