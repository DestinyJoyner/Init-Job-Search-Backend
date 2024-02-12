const db = require("../db/dbConfig.js");
const { deleteAllUserSkills } = require("./userSkills.js");
const {addProject, updateProject, getOneProject} = require("./projects.js")

const getAllUsers = async () => {
  try {
    const allUsers = await db.any("SELECT id,first_name FROM users");
   
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

    oneUser.skills = {
      skill_names: userSkills.map(({ skill_name }) => skill_name),
      skill_ids: userSkills.map(({ skill_id }) => skill_id),
    };

    const userProject = await getOneProject(userID)
    if(userProject.user_id){
      oneUser.project = userProject
    }
    else {
      oneUser.project = {
        project_link: "",
        project_description: "",
        project_name: "",
        user_id: userID
      }
    }



    // oneUser.skills["skill_names"] = userSkills.map(({ skill_name }) => skill_name);
    // oneUser.skills["skill_ids"] = userSkills.map(({ skill_id }) => skill_id);
    return oneUser;
  } catch (error) {
    return error;
  }
};

const createUser = async ({ profile, skills, login }) => {
  // conditionals for projects tbd
  const { first_name, last_name, education, bio, project, position } = profile;
  const { email, password } = login;
  try {
    const newUser = await db.one(
      "INSERT INTO users (first_name, last_name, education, bio, position) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [first_name, last_name, education, bio, position]
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

    addProject(newUser.id, project)

    return newUser;
  } catch (error) {
    return error;
  }
};

const updateUser = async ({ profile, skills }, userID) => {
  const { first_name, last_name, education, bio, project, position} =
    profile;
    
  try {
    const updatedUser = await db.one(
      "UPDATE users SET first_name=$1, last_name=$2, education=$3, bio=$4, position =$5 WHERE id=$6 RETURNING *",
      [first_name, last_name, education, bio, position, userID]
    );
    
    deleteAllUserSkills(userID);
    skills.forEach((e) =>
      db.one(
        "INSERT INTO users_skills (user_id, skill_id) VALUES ($1, $2) RETURNING *",
        [userID, e]
      )
    );

   const projectUpdate = await updateProject(userID,project)
        updatedUser.project = projectUpdate
        console.log(updatedUser, "update user")
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
