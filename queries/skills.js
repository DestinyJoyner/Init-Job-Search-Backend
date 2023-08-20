const db = require("../db/dbConfig.js");

//All skills
const getAllSkills = async () => {
  try {
    // const allSkills = await db.any("SELECT * FROM skills");
    const allSkills = await db.any("\dt;");

    return allSkills;
  } catch (error) {
    return error;
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
  getSkillByID,
};
