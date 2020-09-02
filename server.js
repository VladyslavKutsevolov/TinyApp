const express = require('express');
const morgan = require('morgan');
const { router, urlDatabase } = require('./routes/urls.routes');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan('dev'));
// View engine
app.set('view engine', 'ejs');
// Routes
app.use('/urls', router);

app.get('/', (req, res) => {
  res.redirect('/urls');
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  res.cookie('username', username);
  res.redirect('/urls');
});

app.post('/logout', (req, res) => {
  const { username } = req.cookies;
  res.clearCookie('username', username);
  res.redirect('/urls');
});

app.get('/u/:shortURL', (req, res) => {
  const { shortURL } = req.params;
  const longURL = urlDatabase[shortURL];
  res.redirect(longURL);
});

app.listen(PORT, () => {
  `Server listening on port: ${PORT}`;
});
