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
      "SELECT job_id, users_jobs.user_id, first_name, last_name, email FROM users_jobs JOIN jobs ON jobs.id = users_jobs.job_id JOIN users ON users.id = users_jobs.user_id JOIN logins ON logins.user_id = users_jobs.user_id  WHERE jobs.recruiter_id = $1",
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
                  ["email"]: e["email"],
                },
              ])
            : (recruiterJobs[i].users = [
                {
                  ["user_id"]: e["user_id"],
                  ["first_name"]: e["first_name"],
                  ["last_name"]: e["last_name"],
                  ["email"]: e["email"],
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

const createRecruiter = async ({ login, profile }) => {
  const { email, password } = login;
  const { first_name, last_name, organization } = profile;
  try {
    const newRecruiter = await db.one(
      "INSERT INTO recruiters (first_name, last_name, organization) VALUES ($1, $2, $3)RETURNING *",
      [first_name, last_name, organization]
    );
    db.one(
      "INSERT INTO recruiter_logins (email, password, recruiter_id) VALUES ($1, $2, $3) RETURNING *",
      [email, password, newRecruiter.id]
    );
    return newRecruiter;
  } catch (error) {
    return error;
  }
};

const updateRecruiter = async (recruiterID, body) => {
  const { first_name, last_name, organization } = body.profile;
  try {
    const updatedRecruiter = await db.one(
      "UPDATE recruiters SET first_name=$1, last_name=$2, organization=$3 WHERE id=$4 RETURNING *",
      [first_name, last_name, organization, recruiterID]
    );
    return updatedRecruiter;
  } catch (error) {
    return error;
  }
};

const deleteRecruiter = async (recruiterID) => {
  try {
    const deletedRecruiter = await db.one(
      "DELETE FROM recruiters WHERE id=$1 RETURNING *",
      recruiterID
    );
    return deletedRecruiter;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllRecruiters,
  getOneRecruiter,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter,
};
