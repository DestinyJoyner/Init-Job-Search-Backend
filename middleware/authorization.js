const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
const { getLoginByEmail } = require("../queries/logins.js");
const { getRecruiterLoginByEmail } = require("../queries/recruiterLogins.js");

dotenv.config();

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

// JWT generate token
// Refresh Token To Be Added
const generateWebToken = (email) => {
  return JWT.sign({ email: email }, process.env.SECRET_TOKEN, {
    expiresIn: "720h",
  });
};

// initially check if email is linked to an account in the db
// if entered password matches the one in the db then proceed

const userLogin = async (req, res, next) => {
  const { email, password, isRecruiter } = req.body;
  let credentials = isRecruiter
    ? await getRecruiterLoginByEmail(email.toLowerCase())
    : await getLoginByEmail(email.toLowerCase());
  if (!credentials.message) {
    const isPassValid = await bcrypt.compare(password, credentials.password);
    if (isPassValid) {
      const token = generateWebToken(email);
      req.body.token = token;
      isRecruiter
        ? (req.body["recruiter_id"] = credentials["recruiter_id"])
        : (req.body["user_id"] = credentials["user_id"]);
      next();
    } else {
      res.status(400).json({ error: "Invalid password" });
    }
  } else {
    res.status(401).json({ error: `No account linked to ${email}` });
  }
};

// verify token for accessing and updating user profile data
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    console.log(token)
    req.decoded = JWT.verify(token, process.env.SECRET_TOKEN);
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = {
  hashPass,
  userLogin,
  verifyToken,
};
