const db = require("../db/dbConfig.js");
const { deleteAllUserSkills } = require("./userSkills.js");

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

const createUser = async ({ profile, skills, login }) => {
  // conditionals for projects tbd
  const { first_name, last_name, school, bio, project_one, project_two } =
    profile;
  const { email, password } = login;
  try {
    const newUser = await db.one(
      "INSERT INTO users (first_name, last_name, school, bio, project_one, project_two) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [first_name, last_name, school, bio, project_one, project_two]
    );
    db.one(
      "INSERT INTO logins (email, password, user_id) VALUES ($1, $2, $3) RETURNING *",
      [email, password, newUser.id]
    );
    skills.forEach((e) =>
      db.one(
        "INSERT INTO users_skills (user_id, skill_id) VALUES ($1, $2)RETURNING *",
        [newUser.id, e]
      )
    );
    return newUser;
  } catch (error) {
    return error;
  }
};

const updateUser = async ({ profile, skills }, userID) => {
  const { first_name, last_name, school, bio, project_one, project_two } =
    profile;
  try {
    const updatedUser = await db.one(
      "UPDATE users SET first_name=$1, last_name=$2, school=$3, bio=$4, project_one=$5, project_two=$6 WHERE id=$7 RETURNING *",
      [first_name, last_name, school, bio, project_one, project_two, userID]
    );
    deleteAllUserSkills(userID);
    skills.forEach((e) =>
      db.one(
        "INSERT INTO users_skills (user_id, skill_id) VALUES ($1, $2)RETURNING *",
        [userID, e]
      )
    );
    return updatedUser;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (userID) => {
  try {
    const deletedUser = await db.one(
      "DELETE FROM users WHERE id=$1 RETURNING *",
      userID
    );
    return deletedUser;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};
