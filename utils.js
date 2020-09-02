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

module.exports = { generateRandomString, findUser };
