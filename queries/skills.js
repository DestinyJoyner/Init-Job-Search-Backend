const db = require("../db/dbConfig.js");

//All skills
const getAllSkills = async (userID = false) => {
  if (userID){
    try {
      const userSkills = await db.any("SELECT skill_name FROM users_skills JOIN skills ON skills.id = users_skills.skill_id  WHERE user_id=$1;", userID);
      return userSkills
    } catch (error) {
      return error;
    }
  }
  else {
    try {
      const allSkills = await db.any("SELECT * FROM skills");
      return allSkills;
    } catch (error) {
      return error;
    }
  }
  };

//Skills by id
  const getSkillByID = async (skillID) => {
  try {
    const oneSkill = await db.one("SELECT * FROM skills WHERE id=$1", skillID);
    return oneSkill;
  } catch (error) {
    return error;
  }
};

module.exports = {
    getAllSkills,
    getSkillByID
}