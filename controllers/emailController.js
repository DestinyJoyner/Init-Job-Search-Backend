const express = require("express");
const emails = express.Router();
const { checkEmail, checkRecruiterEmail } = require("../queries/emails");

//check users logins
emails.get("/users/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const isUnique = await checkEmail(email);
    res.status(200).json({ isEmailUnique: isUnique });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

//check recruiters logins
emails.get("/recruiters/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const isUnique = await checkRecruiterEmail(email);
    res.status(200).json({ isEmailUnique: isUnique });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

module.exports = emails;
