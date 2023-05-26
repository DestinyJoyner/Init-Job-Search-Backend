const db = require("../db/dbConfig.js");

const getAllRecruiters = async () => {
  try {
    const allRecruiters = await db.any("SELECT * FROM recruiters");
    return allRecruiters;
  } catch (error) {
    return error;
  }
};

const getOneRecruiter = async (recruiterID) => {
  try {
    const oneRecruiter = await db.one(
      "SELECT * FROM recruiters WHERE id=$1",
      recruiterID
    );

    const recruiterJobs = await db.any(
      "SELECT title, company, city, full_remote, id from jobs WHERE recruiter_id=$1",
      recruiterID
    );
    oneRecruiter["jobs_posted"] = recruiterJobs;
    return oneRecruiter;
  } catch (error) {
    return error;
  }
};

module.exports = {
    getAllRecruiters,
    getOneRecruiter,
}
