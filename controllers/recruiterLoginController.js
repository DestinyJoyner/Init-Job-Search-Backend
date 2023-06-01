const express = require("express");
const recruiterLogin = express.Router();
const {
  getAllRecruiterLogins,
  updateRecruiterEmail,
  updateRecruiterPassword,
} = require("../queries/recruiterLogins.js");
const { checkRecruiterEmail } = require("../queries/emails.js");
const { userLogin, hashPass } = require("../middleware/authorization.js");
const { emailValidation } = require("../middleware/emailValidation.js");
const {
  validationError,
} = require("../middleware/schemaValidations/errorValidation.js");
const {
  passwordSchema,
} = require("../middleware/schemaValidations/loginValidation.js");
const { caseConversion } = require("../middleware/schemaValidations/userValidation.js");

// Index
recruiterLogin.get("/", async (req, res) => {
  const allRecruiterLogins = await getAllRecruiterLogins();
  if (allRecruiterLogins.length) {
    res.status(200).json(allRecruiterLogins);
  } else {
    res.status(500).json({
      error: "Server error",
    });
  }
});

// Update email
recruiterLogin.put("/:id/email",caseConversion, emailValidation, async (req, res) => {
  const { id } = req.params;
  const updatedRecruiterEmail = await updateRecruiterEmail(id, req.body);
  if (!updatedRecruiterEmail.message) {
    res.status(200).json(updatedRecruiterEmail);
  } else {
    res.status(500).json({ error: updatedRecruiterEmail.message });
  }
});

//Update password
recruiterLogin.put(
  "/:id/password",
  passwordSchema,
  validationError,
  hashPass,
  async (req, res) => {
    const { id } = req.params;
    const updatedRecruiterPassword = await updateRecruiterPassword(id, req.body);
    if (!updatedRecruiterPassword.message) {
      res.status(200).json(updatedRecruiterPassword);
    } else {
      res.status(500).json({ error: updatedRecruiterPassword.message });
    }
  }
);

// Check email
// to check email while entered in registration form
recruiterLogin.get("/check/:email", async (req, res) => {
  const { email } = req.params;
  const isUnique = await checkRecruiterEmail(email);
  res.status(200).json({ value: isUnique });
});

// Sign-in verification
recruiterLogin.post("/", userLogin, async (req, res) => {
  // add tokens
  // return user_id for front-end and the token
  req.body.token;
  res.status(200).json({
    message: "You are signed in!",
    token: req.body.token,
    recruiter_id: req.body["recruiter_id"],
  });
});

module.exports = recruiterLogin;
