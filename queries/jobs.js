const db = require("../db/dbConfig.js");

const getAllJobs = async () => {
    try {
        const allJobs = await db.any("SELECT * FROM jobs");
        return allJobs
    } catch (error) {
        return error
    }
}

const getOneJob = async (idVal) => {
    try {
        const oneJob = await db.one("SELECT * FROM jobs WHERE id=$1", idVal);
        return oneJob;
    } catch (error) {
        return error
    }
}

const createJob = async (job) => {
    try {
        const newJob = await db.one(
            "INSERT INTO jobs (title, company, city, details, full_remote) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [
                job.title,
                job.company,
                job.city,
                job.details,
                job.full_remote
            ]
        )
        return newJob
    } catch (error) {
        return (error);
    }
}

const updateJob = async (job, idVal) => {
    try {
        const updatedJob = await db.one(
            "UPDATE jobs SET title=$1, company=$2, city=$3, details=$4, full_remote=$5 WHERE id=$6 RETURNING *",
            [
                job.title,
                job.company,
                job.city,
                job.details,
                job.full_remote,
                idVal
            ]
        )
        return updatedJob
    } catch (error) {
        return (error);
    }
}

const deleteJob = async (idVal) => {
    try {
        const deletedJob = await db.one(
            "DELETE FROM jobs WHERE id=$1 RETURNING *",
            idVal
        );
        return deletedJob;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllJobs,
    getOneJob,
    createJob,
    updateJob,
    deleteJob,
}