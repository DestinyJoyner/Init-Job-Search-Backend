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

    const recruiterJobsUsers = await db.any(
      "SELECT job_id, user_id, first_name, last_name FROM users_jobs JOIN jobs ON jobs.id = users_jobs.job_id JOIN users ON users.id = users_jobs.user_id WHERE jobs.recruiter_id = $1",
      recruiterID
    );

    recruiterJobs.forEach(({ id }, i) =>
      recruiterJobsUsers.forEach((e) =>
        id === e["job_id"]
          ? recruiterJobs[i].users !== undefined
            ? (recruiterJobs[i].users = [
                ...recruiterJobs[i].users,
                {
                  ["user_id"]: e["user_id"],
                  ["first_name"]: e["first_name"],
                  ["last_name"]: e["last_name"],
                },
              ])
            : (recruiterJobs[i].users = [
                {
                  ["user_id"]: e["user_id"],
                  ["first_name"]: e["first_name"],
                  ["last_name"]: e["last_name"],
                },
              ])
          : null
      )
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
};
