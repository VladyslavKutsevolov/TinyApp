const bcrypt = require('bcryptjs');

const userDB = {
  asd: {
    id: 'asd',
    name: 'Vlad',
    email: 'Vlad@a.com',
    password: bcrypt.hashSync('123', 10),
  },
  qwe: {
    id: 'qwe',
    name: 'James',
    email: 'James@a.com',
    password: bcrypt.hashSync('222', 10),
  },
  qaz: {
    id: 'qaz',
    name: 'Bond',
    email: 'Bond@a.com',
    password: bcrypt.hashSync('111', 10),
  },
};

module.exports = userDB;
