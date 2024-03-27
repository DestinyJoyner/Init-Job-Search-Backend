const db = require("../db/dbConfig.js");

const addProject = async (userID, projectObj) => {
  const { project_name, project_link, project_description } = projectObj;

  try {
    db.oneOrNone(
      "DELETE FROM users_projects WHERE user_id =$1 AND EXISTS (SELECT 1 FROM users_projects WHERE user_id =$1)",
      userID
    );

    const addOneProject = await db.one(
      "INSERT INTO users_projects (user_id, project_name, project_link, project_description) VALUES ($1,$2,$3,$4) RETURNING *",
      [userID, project_name, project_link, project_description]
    );

    return addOneProject;
  } catch (error) {
    return error;
  }
};

const updateProject = async (userID, projectObj) => {
  try {
    db.oneOrNone(
      "DELETE FROM users_projects WHERE user_id =$1 AND EXISTS (SELECT 1 FROM users_projects WHERE user_id =$1)",
      userID
    );

    const insertProject = addProject(userID, projectObj);

    return insertProject;
  } catch (error) {
    return error;
  }
};

const getOneProject = async (userID) => {
  try {
    const userProject = await db.one(
      "SELECT * FROM users_projects WHERE user_id=$1",
      +userID
    );

    return userProject;
  } catch (error) {
    return error;
  }
};

module.exports = {
  addProject,
  updateProject,
  getOneProject,
};

/* 
return {
          user_id: +userID,
          project_name: "",
          project_link: "",
          project_description: ""

      }
*/
