const bcrypt = require("bcrypt");

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

module.exports = {
  hashPass,
};