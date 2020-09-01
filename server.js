const express = require('express');
const { generateRandomString } = require('./utils');

const app = express();
const PORT = 3000;

// app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

let urlDatabase = {
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
  const { longURL } = req.body;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;
  res.redirect(`/urls/${shortURL}`);
});

app.get('/u/:shortURL', (req, res) => {
  const { shortURL } = req.params;
  const longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});

app.get('/urls/:shortURL', (req, res) => {
  const { shortURL } = req.params;
  const longURL = urlDatabase[shortURL];
  const templateVars = { shortURL, longURL };
  res.render('urls_show', templateVars);
});

app.listen(PORT, () => {
  `Server listening on port: ${PORT}`;
});
