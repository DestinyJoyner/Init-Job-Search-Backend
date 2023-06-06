const db = require("../db/dbConfig.js");

// query used to check if email is already in db while new user is signing up
const checkEmail = async (email) => {
  try {
    const isUnique = await db.one(
      "SELECT email FROM logins WHERE email=$1",
      email
    );
    return false;
  } catch (error) {
    return true;
  }
};

const checkRecruiterEmail = async (email) => {
  try {
    const isUnique = await db.one(
      "SELECT email FROM recruiter_logins WHERE email=$1",
      email
    );
    return false;
  } catch (error) {
    return true;
  }
};

module.exports = { checkEmail, checkRecruiterEmail };
