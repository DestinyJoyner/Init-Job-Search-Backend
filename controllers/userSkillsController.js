const express = require("express");
const userSkills = express.Router();
const {
    createUserSkill,
    // deleteUserSkill
} = require("../queries/userSkills.js");

// CREATE
userSkills.post("/", async (req, res) => {
    const newUserSkill = await createUserSkill(req.body);
    if(!newUserSkill.message) {
         res.status(200).json(newUserSkill);
    } else {
        res.redirect("/not-found");
    }

})

// DELETE

module.exports = userSkills