const generateRandomString = () => {
  return Math.random().toString(36).substring(2, 8);
};

const findUser = (email, db) => {
  for (const userId in db) {
    const user = db[userId];
    if (user.email === email) {
      return user;
    }
  }
  return null;
};

const filterUserById = (userId, db) => {
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
  if (req.cookies.userId) {
    return next();
  } else {
    res.redirect('/login');
  }
};

const isMatch = (user1, user2) => {
  return user1 === user2;
};

module.exports = {
  generateRandomString,
  findUser,
  isAuthenticated,
  isMatch,
  filterUserById,
};
