const { assert: equal } = require('chai');

const { findUserByEmail, filterUsersById } = require('../utils');

const testUsers = {
  userRandomID: {
    id: 'userRandomID',
    email: 'user@example.com',
    password: 'purple-monkey-dinosaur',
  },
  user2RandomID: {
    id: 'user2RandomID',
    email: 'user2@example.com',
    password: 'dishwasher-funk',
  },
};

describe('getUserByEmail', () => {
  it('should return a user with valid email', () => {
    const user = findUserByEmail('user@example.com', testUsers);
    const expectedOutput = {
      id: 'userRandomID',
      email: 'user@example.com',
      password: 'purple-monkey-dinosaur',
    };
    equal(user, expectedOutput);
  });
});

describe('filterUsersById', () => {
  it('shoul return object with list that belongs to the same useId', () => {
    const db = {
      b2xVn2: { longURL: 'http://www.lighthouselabs.ca', userId: 'asd' },
      '9sm5xK': { longURL: 'http://www.google.com', userId: 'asd' },
      '9sm25xK': { longURL: 'http://www.google.com', userId: 'qwe' },
      '9sm225xK': { longURL: 'http://www.google.com', userId: 'qwe' },
      '9sm252xK': { longURL: 'http://www.google.com', userId: 'qwe' },
    };
    const filteredList = filterUsersById('qwe', db);
    const expected = {
      '9sm25xK': { longURL: 'http://www.google.com', userId: 'qwe' },
      '9sm225xK': { longURL: 'http://www.google.com', userId: 'qwe' },
      '9sm252xK': { longURL: 'http://www.google.com', userId: 'qwe' },
    };

    equal(filteredList, expected);
  });
});
