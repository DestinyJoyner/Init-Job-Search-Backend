const express = require("express")
const jobs = express.Router()
const { getAllJobs, getOneJob, createJob, updateJob, deleteJob} = require("../queries/jobs.js")

// INDEX
jobs.get("/", async (req, resp) => {
    const allJobs = await getAllJobs()

    if(allJobs.length){
        resp.status(200).json(allJobs);
    }
    else {
        resp.status(500).json({ Error: "server error"});
    }
})

// SHOW
jobs.get("/:id", async (req, resp) => {
    const { id } = req.params;
    const singleJob = await getOneJob(id);

    if(singleJob.details){
        resp.status(200).json(singleJob)
    } else {
        resp.redirect("/not-found")
    }
})

// CREATE
jobs.post("/", async ( req, resp ) => {
    const createdJob = await createJob(req.body)

    if(createdJob.details){
        resp.status(200).json(createdJob)
    } else {
        resp.status(500).json({ Error: createdJob})
    }
})

// DELETE
jobs.delete("/:id", async ( req, resp) => {
    const { id } = req.params 
    const deletedJob = await deleteJob(id)

    if(deletedJob.details){
        resp.status(200).json(deletedJob)
    } else {
        resp.status(500).json({ Error: deletedJob})
    }
})

// UPDATE
jobs.put("/:id", async (req, resp) => {
    const { id } = req.params
    const updatedJob = await updateJob(req.body, id)

    if(updatedJob.details){
        resp.status(200).json(updatedJob)
    } else {
        resp.status(500).json({ Error: updatedJob})
    }
})

module.exports = jobs