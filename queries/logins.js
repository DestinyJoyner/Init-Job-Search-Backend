const db = require("../db/dbConfig.js");

// Index
const getAllLogins = async () => {
  try {
    const allLogins = await db.any(
      "SELECT * FROM logins JOIN users ON user_id = id"
    );
    return allLogins;
  } catch (error) {
    return error;
  }
};

// Update credentials
const updateEmail = async (userID, body) => {
  const { email } = body.login;
  try {
    const updatedEmail = await db.one(
      "UPDATE logins SET email=$1 WHERE user_id=$2 RETURNING *",
      [email, userID]
    );

    return updatedEmail;
  } catch (error) {
    return error;
  }
};
const updatePassword = async (userID, body) => {
  const { password } = body.login;
  try {
    const updatedPassword = await db.one(
      "UPDATE logins SET password=$1 WHERE user_id=$2 RETURNING *",
      [password, userID]
    );

    return updatedPassword;
  } catch (error) {
    return error;
  }
};

// Get credentials by email
const getLoginByEmail = async (email) => {
  try {
    const loginCredentials = await db.one(
      "SELECT * FROM logins WHERE email=$1",
      email
    );
    return loginCredentials;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllLogins, getLoginByEmail, updateEmail, updatePassword };
