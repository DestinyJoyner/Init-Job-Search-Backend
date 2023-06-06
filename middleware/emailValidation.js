const { checkEmail, checkRecruiterEmail } = require("../queries/emails.js");

const emailValidation = async (req, res, next) => {
  const { email, isRecruiter } = req.body.login;
  // console.log(email)

  const isEmailUnique = isRecruiter? await checkRecruiterEmail(email) :await checkEmail(email);
  if (isEmailUnique) {
    next();
  } else {
    res.status(400).json({ error: `${email} is linked to another account!` });
  }
};

module.exports = { emailValidation,};
