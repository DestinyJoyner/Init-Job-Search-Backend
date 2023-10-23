const express = require("express");
const company = express.Router();
const { getAllCompanies, getOneCompany} = require("../queries/company.js")

company.get("/", async (req, res) => {
    const allCompanies = await getAllCompanies()

    res.status(200).json(allCompanies);
})

company.get("/:companyName", async (req, res) => {
    const { companyName } = req.params

    const oneCompany = await getOneCompany(companyName)


    if (!oneCompany.message) {
        res.status(200).json(oneCompany);
      } else {
        res.status(500).json({ Error: oneCompany.message });
      }
})

module.exports = company;