const bcrypt = require("bcrypt");
const { getLoginByEmail } = require("../queries/logins.js");

// genSalt will generate the default number for the salting rounds
// bcrypt.hash will take the inputted password by the user and salt and hash it
// finally we replace the inputted password with the newly generated hashed secure password
const hashPass = (req, res, next) => {
  bcrypt.genSalt().then((salt) => {
    bcrypt
      .hash(req.body.login.password, salt)
      .then((hash) => {
        req.body.login.password = hash;
      })
      .then(() => next());
  });
};


// initially check if email is linked to an account in the db
// if entered password matches the one in the db then proceed

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const credentials = await getLoginByEmail(email);
  if (!credentials.message) {
    const isPassValid = await bcrypt.compare(password, credentials.password);
    if (isPassValid) {
      next();
    } else {
      res.status(400).json({ error: "Invalid password" });
    }
  } else {
    res.status(401).json({ error: `No account linked to ${email}` });
  }
};

module.exports = {
  hashPass,
};
