const express = require("express");
const recruiters = express.Router();
const {
  getAllRecruiters,
  getOneRecruiter,
} = require("../queries/recruiters.js");

// Index
recruiters.get("/", async (req, res) => {
  const allRecruiters = await getAllRecruiters();
  if (allRecruiters.length) {
    res.status(200).json(allRecruiters);
  } else {
    res.status(500).json({
      error: "Server error",
    });
  }
});

// Show
recruiters.get("/:id", async (req, res) => {
  const { id } = req.params;
  const recruiter = await getOneRecruiter(id);
  if (!recruiter.message) {
    res.status(200).json(recruiter);
  } else {
    res.status(500).json(recruiter.message);
  }
});

module.exports = recruiters;
