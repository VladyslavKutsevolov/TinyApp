const { Router } = require('express');
const { generateRandomString } = require('../utils');

const router = Router();

let urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com',
};

// All routes starts with /urls/...
router.get('/', (req, res) => {
  const { username } = req.cookies;
  const templateVars = { urls: urlDatabase, username };

  res.render('urls_index', templateVars);
});

router.get('/new', (req, res) => {
  const { username } = req.cookies;
  res.render('urls_new', { username });
});

router.post('/', (req, res) => {
  const { longURL } = req.body;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = longURL;

  res.redirect(`/urls`);
});

router.post('/:shortURL', (req, res) => {
  const {
    params: { shortURL },
    body: { longURL },
  } = req;

  urlDatabase[shortURL] = longURL;

  res.redirect('/urls');
});

router.post('/:shortURL/delete', (req, res) => {
  const { shortURL } = req.params;
  delete urlDatabase[shortURL];

  res.redirect('/urls');
});

router.get('/:shortURL', (req, res) => {
  const {
    params: { shortURL },
    cookies: { username },
  } = req;
  const longURL = urlDatabase[shortURL];
  const templateVars = { shortURL, longURL, username };

  res.render('urls_show', templateVars);
});

module.exports = { router, urlDatabase };
