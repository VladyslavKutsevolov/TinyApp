const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 8);
};

const findUserByEmail = (email, db) => {
  for (const userId in db) {
    const user = db[userId];
    if (user.email === email) {
      return user;
    }
  }
  return null;
};

const filterUsersById = (userId, db) => {
  let listOfURLs = {};
  for (const id in db) {
    const user = db[id];
    if (user.userId === userId) {
      listOfURLs[id] = user;
    }
  }
  return listOfURLs;
};

const isAuthenticated = (req, res, next) => {
  if (req.session.user.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
};

const isMatch = (userId, id) => {
  return userId === id;
};

module.exports = {
  generateRandomString,
  findUserByEmail,
  isAuthenticated,
  isMatch,
  filterUsersById,
};
