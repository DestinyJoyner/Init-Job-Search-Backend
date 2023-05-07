const express = require("express");
const skills = express.Router({mergeParams: true});
const { getAllSkills, getSkillByID } = require("../queries/skills");

// Index
skills.get("/", async (req, res) => {
  const {userID} = req.params 
  const allSkills = await getAllSkills(userID);
  if (allSkills.length) {
    res.status(200).json(allSkills);
  } else {
    res.status(500).json({
      error: "Server error",
    });
  }
});

// Show
skills.get("/:id", async (req, res) => {
  const { id } = req.params;
  const skill = await getSkillByID(id);
  if (!skill.message) {
    res.status(200).json(skill);
  } else {
    res.redirect("/not-found");
  }
});

module.exports = skills;