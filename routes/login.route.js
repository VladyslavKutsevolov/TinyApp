const { Router } = require('express');
const userDB = require('../user.db');
const { findUser } = require('../utils');

const router = Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and Password required!');
  }

  const user = findUser(email, userDB);

  if (!user) {
    return res.status(400).send('Email or Password is incorrect!');
  }

  if (user.password !== Number(password)) {
    return res.status(400).send('Email or Password is incorrect!');
  }

  res.cookie('userId', user.id);
  res.cookie('username', user.name);
  res.redirect('/urls');
});

module.exports = { router };
