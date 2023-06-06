const db = require("../db/dbConfig.js");

// Index
const getAllRecruiterLogins = async () => {
  try {
    const allRecruiterLogins = await db.any(
      "SELECT email, password, recruiter_id, first_name, last_name, organization FROM recruiter_logins JOIN recruiters ON recruiter_id = id"
    );
    return allRecruiterLogins;
  } catch (error) {
    return error;
  }
};

// Update credentials
const updateRecruiterEmail = async (recruiterID, body) => {
  const { email } = body.login;
  try {
    const updatedRecruiterEmail = await db.one(
      "UPDATE recruiter_logins SET email=$1 WHERE recruiter_id=$2 RETURNING *",
      [email, recruiterID]
    );
    return updatedRecruiterEmail;
  } catch (error) {
    return error;
  }
};
const updateRecruiterPassword = async (recruiterID, body) => {
  const { password } = body.login;
  try {
    const updatedRecruiterPassword = await db.one(
      "UPDATE recruiter_logins SET password=$1 WHERE recruiter_id=$2 RETURNING *",
      [password, recruiterID]
    );
    return updatedRecruiterPassword;
  } catch (error) {
    return error;
  }
};

// Get credentials by email
const getRecruiterLoginByEmail = async (email) => {
  try {
    const loginRecruiterCredentials = await db.one(
      "SELECT * FROM recruiter_logins WHERE email=$1",
      email
    );
    return loginRecruiterCredentials;
  } catch (error) {
    return error;
  }
};

module.exports = { getAllRecruiterLogins, getRecruiterLoginByEmail, updateRecruiterEmail, updateRecruiterPassword };