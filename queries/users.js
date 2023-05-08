const db = require("../db/dbConfig.js");

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT * FROM users");
    return allUsers;
  } catch (error) {
    return error;
  }
};

const getUserByID = async (userID) => {
  try {
    const oneUser = await db.one("SELECT * FROM users WHERE id=$1", userID);
    const userSkills = await db.any(
      "SELECT * FROM users_skills JOIN skills ON skills.id = users_skills.skill_id WHERE user_id=$1",
      userID
    );
    oneUser.skills = userSkills.map(({ skill_name }) => skill_name);
    return oneUser;
  } catch (error) {
    return error;
  }
};

const createUser = async ({
  first_name,
  last_name,
  school,
  bio,
  project_one,
  project_two,
}) => {
  // conditionals for projects tbd
  try {
    const newUser = await db.one(
      "INSERT INTO users (first_name, last_name, school, bio, project_one, project_two) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [first_name, last_name, school, bio, project_one, project_two]
    );
    return newUser;
  } catch (error) {
    return error;
  }
};

const updateUser = async (user, userID) => {
  const { first_name, last_name, school, bio, project_one, project_two } = user;
  try {
    const updatedUser = await db.one(
      "UPDATE users SET first_name=$1, last_name=$2, school=$3, bio=$4, project_one=$5, project_two=$6 WHERE id=$7 RETURNING *",
      [first_name, last_name, school, bio, project_one, project_two, userID]
    );
    return updatedUser;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
};
