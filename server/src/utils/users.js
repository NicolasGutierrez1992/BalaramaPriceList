const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "..", "users.json");

const getUsers = () => {
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
  }
  const data = fs.readFileSync(USERS_FILE);
  return JSON.parse(data);
};

const saveUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};

module.exports = { getUsers, saveUsers };
