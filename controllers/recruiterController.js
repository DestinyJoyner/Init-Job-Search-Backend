const express = require("express");
const recruiters = express.Router();
const {
  getAllRecruiters,
  getOneRecruiter,
  createRecruiter,
  updateRecruiter,
  deleteRecruiter,
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

// Create
recruiters.post("/", async (req, res) => {
  const newRecruiter = await createRecruiter(req.body);
  if (!newRecruiter.message) {
    res.status(200).json(newRecruiter);
  } else {
    res.json({ error: newRecruiter.message });
  }
});

// Update
recruiters.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedRecruiter = await updateRecruiter(id, req.body);
  if (!updatedRecruiter.message) {
    res.status(200).json(updatedRecruiter);
  } else {
    res.status(500).json({ error: updatedRecruiter.message });
  }
});

// Delete
recruiters.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedRecruiter = await deleteRecruiter(id);
  if (!deletedRecruiter.message) {
    res.status(200).json(deletedRecruiter);
  } else {
    res.status(500).json({ error: deletedRecruiter.message });
  }
});

module.exports = recruiters;

// shape of post for recruiter
// {
//     "recruiterProfile": {
//          "first_name": "Jane",
//          "last_name": "Adams",
//          "organization": "Peloton"
//     },
//     "recruiterLogin":    {
//         "email": "recruiter1@email.com",
//         "password": "passwordR"
//     }
//      }
