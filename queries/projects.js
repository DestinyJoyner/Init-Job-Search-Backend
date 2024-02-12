const db = require("../db/dbConfig.js");

const addProject = async (userID, projectObj) => {
  const { project_name, project_link, project_description } = projectObj;

  try {
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
  const { project_name, project_link, project_description } = projectObj;
  console.log(projectObj, "update before")

  try {
    await db.one("DELETE FROM users_projects WHERE user_id=$1", +userID)
    const insertProject =  addProject(userID, projectObj)
    console.log(insertProject, " after re add project")

    // const searchForProject = await db.any("SELECT * FROM users_projects WHERE user_id=$1", userID)

    // if(searchForProject.length === 0) {
    //    updateOneProject = await addProject(userID, projectObj)
    // }
    // else {
    //     updateOneProject = await db.one(
    //   "UPDATE users_projects  project_name=$1, project_link=$2,project_description=$3 WHERE user_id=$4 RETURNING *",
    //   [project_name, project_link, project_description, userID]
    // );
   
    // }
    return insertProject;

  } catch (error) {
    return error;
  }
};

const getOneProject = async (userID) => {
    try {
        const userProject = await db.one("SELECT * FROM users_projects WHERE user_id=$1", +userID)

        return userProject
        
    } catch (error) {
      
        return {
          user_id: +userID,
          project_name: "",
          project_link: "",
          project_description: ""

      }
        
    }
}

module.exports = {
  addProject,
  updateProject,
  getOneProject
};
