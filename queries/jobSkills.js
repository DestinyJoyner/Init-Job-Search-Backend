const db = require("../db/dbConfig.js");

const createJobSkill = async ({
    job_id,
    skill_id
}) => {
    try {
        const newJobSkill = await db.one(
            "INSERT INTO jobs_skills (job_id, skill_id) VALUES ($1, $2) RETURNING *",
            [
                job_id,
                skill_id
            ]
        );
        return newJobSkill
    } catch (error) {
        return error;
    }
}

const deleteJobSkill = async ({
    job_id,
    skill_id
}) => {
    try {
        const deletedSkill = await db.one("DELETE FROM jobs_skills WHERE job_id=$1 AND skill_id=$2 RETURNING *", [
            job_id,
            skill_id
        ])
        return deletedSkill

    } catch (error) {
        return error
    }
}

module.exports = {
    createJobSkill,
    deleteJobSkill
}