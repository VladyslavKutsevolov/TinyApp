const { Router } = require('express');
const {
  generateRandomString,
  isAuthenticated,
  isMatch,
  filterUserById,
} = require('../utils');
const urlDatabase = require('../urls.db');

const router = Router();

// /urls
router.get('/', isAuthenticated, (req, res) => {
  const { username, userId } = req.cookies;
  const filteredList = filterUserById(userId, urlDatabase);
  const templateVars = { urls: filteredList, username, userId };

  res.render('urls_index', templateVars);
});
// /urls/new
router.get('/new', isAuthenticated, (req, res) => {
  const { username, userId } = req.cookies;

  res.render('urls_new', { username, userId });
});
// /urls
router.post('/', (req, res) => {
  const { longURL } = req.body;
  const { userId } = req.cookies;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = { longURL, userId };
  console.log(urlDatabase);

  res.redirect('/urls');
});
// /urls/:shortURL
router.post('/:shortURL', (req, res) => {
  const {
    params: { shortURL },
    body: { longURL },
    cookies: { userId },
  } = req;

  urlDatabase[shortURL] = { longURL, userId };

  res.redirect('/urls');
});
// /urls/:shortURL/delete
router.post('/:shortURL/delete', isAuthenticated, (req, res) => {
  const {
    params: { shortURL },
    cookies: { userId },
  } = req;
  const user = urlDatabase[shortURL].userId;

  if (!isMatch(user, userId)) {
    return res.status(403).send('Permission Denied');
  }

  delete urlDatabase[shortURL];

  res.redirect('/urls');
});
// /urls/:shortURL
router.get('/:shortURL', (req, res) => {
  const {
    params: { shortURL },
    cookies: { username, userId },
  } = req;

  const user = urlDatabase[shortURL].userId;

  if (!isMatch(user, userId)) {
    return res.status(403).send('Permission Denied');
  }

  const longURL = urlDatabase[shortURL].longURL;
  const templateVars = { shortURL, longURL, username, userId };

  res.render('urls_show', templateVars);
});

module.exports = { router, urlDatabase };
