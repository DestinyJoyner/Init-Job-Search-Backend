const express = require("express");
const logins = express.Router();
const { getAllLogins } = require("../queries/logins.js");
const { checkEmail } = require("../queries/emails.js")

// Index
logins.get("/", async (req, res) => {
    const allLogins = await getAllLogins();
    if(allLogins.length) {
        res.status(200).json(allLogins);
    } else {
        res.status(500).json({
            error: "Server error",
        });
    }
})

// Check email
emails.get("/:email", async (req, res) => {
    const { email } = req.params;
    const isUnique = await checkEmail(email);
    res.status(200).json({ value: isUnique });
  });

module.exports = logins; 