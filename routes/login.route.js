const { Router } = require('express');
const userDB = require('../db/user.db');
const { findUserByEmail } = require('../utils');
const bcrypt = require('bcryptjs');

const router = Router();

router.get('/', (req, res) => {
  const { username, userId } = req.session.user;
  res.render('login', { userId, username });
});

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and Password required!');
  }

  const user = findUserByEmail(email, userDB);
  if (!user) {
    return res.status(403).send('Email or Password is incorrect!');
  }
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) {
      console.log(err);
      return;
    }

    if (isMatch) {
      req.session.user = {
        username: user.name,
        userId: user.id,
      };
      res.redirect('/urls');
    } else {
      return res.status(403).send('Email or Password is incorrect!');
    }
  });
});

module.exports = { router };
