const db = require("../db/dbConfig.js");
const { alreadyExists } = require("./queryValidations.js");

const getAllUserJobs = async (userID) => {
  // getting all jobs linked to userID and joining jobs table with users_jobs for job details
  try {
    const allUserJobs = await db.any(
      "SELECT id, title, company, date_applied FROM users_jobs JOIN jobs ON jobs.id = users_jobs.job_id WHERE user_id=$1",
      userID
    );

    return allUserJobs;
  } catch (error) {
    return error;
  }
};

const createUserJob = async ({ user_id, job_id }) => {
  const exist = await alreadyExists(
    { ["user_id"]: user_id, ["job_id"]: job_id },
    "users_jobs"
  );
  if (exist) {
    return { error: "Entry already exists!" };
  } else {
    try {
      const newUserJob = await db.one(
        "INSERT INTO users_jobs (user_id, job_id) VALUES ($1, $2) RETURNING *",
        [user_id, job_id]
      );
      return newUserJob;
    } catch (error) {
      return error;
    }
  }
};

const deleteUserJob = async ({ user_id, job_id }) => {
  try {
    const deletedUserJob = await db.one(
      "DELETE FROM users_jobs WHERE user_id=$1 AND job_id=$2 RETURNING *",
      [user_id, job_id]
    );
    return deletedUserJob;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllUserJobs,
  createUserJob,
  deleteUserJob,
};
