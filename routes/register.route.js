const { Router } = require('express');
const userDB = require('../db/user.db');
const bcrypt = require('bcryptjs');
const { findUserByEmail, generateRandomString } = require('../utils');

const router = Router();

// /register
router.get('/', (req, res) => {
  const { username, userId } = req.session.user;
  res.render('register', { userId, username });
});

// /register
router.post('/', (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send('Email, Password and Name are required!');
  }

  const user = findUserByEmail(email, userDB);

  if (user) {
    return res.status(400).send('Email already exist');
  } else {
    const id = generateRandomString();

    const newUser = {
      id,
      email,
      password,
      name,
    };

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.log(err);
        return;
      } else {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
          }
          newUser.password = hash;
          userDB[id] = newUser;
          res.redirect('/login');
        });
      }
    });
  }
});

module.exports = { router };
