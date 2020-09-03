const express = require('express');
const morgan = require('morgan');
const { router: urlsRouter, urlDatabase } = require('./routes/urls.routes');
const { router: loginRouter } = require('./routes/login.route');
const { router: registerRoute } = require('./routes/register.route');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const { getterForOverride } = require('./utils');

const app = express();
const PORT = 3000;

//Middleware
app.use(express.static('views'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    keys: ['secret', 'key'],
  })
);
app.use(morgan('dev'));
// View engine
app.set('view engine', 'ejs');
// Routes
app.use('/urls', urlsRouter);
app.use('/login', loginRouter);
app.use('/register', registerRoute);

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.post('/logout', (req, res) => {
  req.session.user = '';
  res.redirect('/login');
});

app.get('/u/:shortURL', (req, res) => {
  const { shortURL } = req.params;
  const longURL = urlDatabase[shortURL].longURL;
  res.redirect(longURL);
});

app.listen(PORT, () => {
  `Server listening on port: ${PORT}`;
});
