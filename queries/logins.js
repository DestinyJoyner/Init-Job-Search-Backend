const db = require("../db/dbConfig.js");

// Show
const getAllLogins = async () => {
  try {
    const allLogins = await db.any("SELECT * FROM logins JOIN users ON user_id = id");
    return allLogins;
  } catch (error) {
    return error;
  }
};

// Get credentials by email
const getLoginByEmail = async (email) => {
  try {
    const loginCredentials = await db.one("SELECT * FROM logins WHERE email=$1", email);
    return loginCredentials;
  } catch (error) {
    return error;
  }
}



module.exports = { getAllLogins, getLoginByEmail };
