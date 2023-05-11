const express = require("express");
const jobSkills = express.Router();
const {
    createJobSkill,
    deleteJobSkill
} = require("../queries/jobSkills.js");

// CREATE
jobSkills.post("/", async (req, res) => {
    const newJobSkill = await createJobSkill(req.body);
    if(!newJobSkill.message) {
         res.status(200).json(newJobSkill);
    } else {
        res.redirect("/not-found");
    }

})

// DELETE
jobSkills.delete("/", async(req, res) => {
   const deletedJobSkill = await deleteJobSkill(req.body)

   if(!deletedJobSkill.message){
    res.status(200).json(deletedJobSkill)
   }
   else{
    res.status(500).json({Error : deletedJobSkill.message})
   }
})

module.exports = jobSkills