const { checkEmail } = require("../queries/emails.js");

const emailValidation = async (req, res, next) => {
  const { email } = req.body.login;
  // console.log(email)
  const isEmailUnique = await checkEmail(email);
  if (isEmailUnique) {
    next();
  } else {
    res.status(400).json({ error: `${email} is linked to another account!` });
  }
};

module.exports = { emailValidation,};
