const express = require("express");
const logins = express.Router();
const {
  getAllLogins,
  updateEmail,
  updatePassword,
} = require("../queries/logins.js");
const { checkEmail } = require("../queries/emails.js");
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
logins.get("/", async (req, res) => {
  const allLogins = await getAllLogins();
  if (allLogins.length) {
    res.status(200).json(allLogins);
  } else {
    res.status(500).json({
      error: "Server error",
    });
  }
});

// Update email
logins.put("/:id/email", emailValidation, caseConversion, async (req, res) => {
  const { id } = req.params;
  const updatedEmail = await updateEmail(id, req.body);
  if (!updatedEmail.message) {
    res.status(200).json(updatedEmail);
  } else {
    res.status(500).json({ error: updatedEmail.message });
  }
});

//Update password
logins.put(
  "/:id/password",
  passwordSchema,
  validationError,
  hashPass,
  async (req, res) => {
    const { id } = req.params;
    const updatedPassword = await updatePassword(id, req.body);
    if (!updatedPassword.message) {
      res.status(200).json(updatedPassword);
    } else {
      res.status(500).json({ error: updatedPassword.message });
    }
  }
);

// Check email
// to check email while entered in registration form
logins.get("/check/:email", async (req, res) => {
  const { email } = req.params;
  const isUnique = await checkEmail(email);
  res.status(200).json({ value: isUnique });
});

// Sign-in verification
logins.post("/", userLogin, async (req, res) => {
  // add tokens
  // return user_id for front-end and the token
  req.body.token;
  res.status(200).json({
    message: "You are signed in!",
    token: req.body.token,
    user_id: req.body["user_id"],
  });
});

module.exports = logins;
