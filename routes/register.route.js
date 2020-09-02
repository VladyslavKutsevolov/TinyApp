const { Router } = require('express');
const userDB = require('../user.db');
const { findUser, generateRandomString } = require('../utils');

const router = Router();

router.get('/', (req, res) => {
  res.render('register');
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

  userDB[id] = newUser;
  res.redirect('/login');
});

module.exports = { router };
