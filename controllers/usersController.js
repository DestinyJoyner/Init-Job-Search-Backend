const express = require("express");
const users = express.Router();
const { getAllUsers } = require("../queries/users.js");

// Index
users.get("/", async (req, res) => {
  const allUsers = await getAllUsers();
  if (allUsers.length) {
    res.status(200).json(allUsers);
  } else {
    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = users;
