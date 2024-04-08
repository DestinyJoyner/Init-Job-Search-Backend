const db = require("../db/dbConfig.js");

const getRecruiterJobsSortOptions = async (recruiterID, sortOption = 'id') => {
  const sortValue = sortOption === "idDesc" ? "id DESC" : `${sortOption}`
    try {
        const recruiterJobs = await db.any(
            "SELECT title, company, city, full_remote, id from jobs WHERE recruiter_id=$1 ORDER BY $2",
            [recruiterID, sortValue]
          );

          const recruiterJobsUsers = await db.any(
            "SELECT job_id, users_jobs.user_id FROM users_jobs JOIN jobs ON jobs.id = users_jobs.job_id JOIN users ON users.id = users_jobs.user_id WHERE jobs.recruiter_id = $1",
            recruiterID
          );
      
          recruiterJobs.forEach(({ id }, i) =>
            recruiterJobsUsers.forEach((e) => {
              id === e["job_id"]
                ? recruiterJobs[i].users !== undefined
                  ? (recruiterJobs[i].users = [
                      ...recruiterJobs[i].users,
                      e["user_id"],
                    ])
                  : (recruiterJobs[i].users = [
                      e["user_id"]
                      
                    ])
                : recruiterJobs[i].users === undefined ?
                recruiterJobs[i].users= [] : null;
            })
          );

        return recruiterJobs
    } catch (error) {
        return error
    }
    
}


module.exports = {
    getRecruiterJobsSortOptions,
}