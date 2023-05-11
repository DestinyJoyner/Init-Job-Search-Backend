const express = require("express");
const users = express.Router();
const {
  getAllUsers,
  getUserByID,
  createUser,
  updateUser,
} = require("../queries/users.js");

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

// Show
users.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await getUserByID(id);
  if (!user.message) {
    res.status(200).json(user);
  } else {
    // res.redirect("/not-found");
    res.status(500).json(user.message);
  }
});

// Create
users.post("/", async (req, res) => {
  const newUser = await createUser(req.body);
  if (!newUser.message) {
    res.status(200).json(newUser);
  } else {
    res.redirect("/not-found");
  }
});

// Update
users.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUser(req.body, id);
  if (!updatedUser.message) {
    res.status(200).json(updatedUser);
  } else {
    res.status(500).json({ error: updatedUser.message });
  }
});

module.exports = users;
