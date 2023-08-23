const express = require("express");
const recruiterJob = express.Router();
const { getRecruiterJobsSortOptions } = require("../queries/recruiterJobs.js")


recruiterJob.get("/:recruiterID", async (req, res) => {
    const {recruiterID} = req.params
    const {sort} = req.query
    let getAllRecruiterJobsSorted;

    if(sort){
         getAllRecruiterJobsSorted = await getRecruiterJobsSortOptions(recruiterID,sort)
    }
    else {
        getAllRecruiterJobsSorted = await getRecruiterJobsSortOptions(recruiterID)
    }
    
    !getAllRecruiterJobsSorted.message ?
    res.status(200).json(getAllRecruiterJobsSorted)
    :
    res.status(500).json(getAllRecruiterJobsSorted.message)
})




module.exports = recruiterJob;