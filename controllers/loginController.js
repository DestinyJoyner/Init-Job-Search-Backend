const express = require("express");
const logins = express.Router();
const { getAllLogins } = require("../queries/logins.js");

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

module.exports = logins; 