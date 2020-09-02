const { Router } = require('express');
const userDB = require('../user.db');
const { findUser, generateRandomString } = require('../utils');

const router = Router();

router.get('/', (req, res) => {
  const { username, userId } = req.cookies;
  res.render('register', { userId, username });
});

router.post('/', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and Password required!');
  }

  const user = findUser(email, userDB);

  if (user) {
    return res.status(400).send('Email already exist');
  }

  const id = generateRandomString();
  const newUser = {
    id,
    email,
    password,
    name,
  };
  console.log(newUser);
  userDB[id] = newUser;

  res.redirect('/login');
});

module.exports = { router };
