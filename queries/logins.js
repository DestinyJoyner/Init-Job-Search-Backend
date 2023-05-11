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

module.exports = { getAllLogins };
