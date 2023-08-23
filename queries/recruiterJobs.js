const db = require("../db/dbConfig.js");

const getRecruiterJobsSortOptions = async (recruiterID, sortOption = 'id') => {
    try {
        const recruiterJobs = await db.any(
            "SELECT title, company, city, full_remote, id from jobs WHERE recruiter_id=$1 ORDER BY $2:name",
            [recruiterID, sortOption]
          );
        return recruiterJobs
    } catch (error) {
        return error
    }
    
}


module.exports = {
    getRecruiterJobsSortOptions,
}