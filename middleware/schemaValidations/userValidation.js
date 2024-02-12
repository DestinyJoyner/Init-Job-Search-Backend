const { body } = require("express-validator");

function capitalizeFirst(string) {
  const newStrArr = string.split(" ")
  const capitalizeStrArr = newStrArr.map(el => {
    const firstCharUpperCase = el.charAt(0).toUpperCase() 
    const lowercase = el.slice(1).toLowerCase()
    return `${firstCharUpperCase}${lowercase}`
  })
  const capitalizeStr = capitalizeStrArr.join(" ") 
  return capitalizeStr;
}

const caseConversion = (req, res, next) => {
  if (req.body.login) {
    req.body.login.email = req.body.login.email.toLowerCase();
  }
  if (req.body.profile) {
    const { first_name, last_name } = req.body.profile;
    req.body.profile["first_name"] = capitalizeFirst(first_name);
    req.body.profile["last_name"] = capitalizeFirst(last_name);
  }
  next();
};

const userSchema = [
  // body("profile.bio").exists({ checkFalsy: true }).isLength({ max: 255 }),
  body("profile.education").exists({ checkFalsy: true }).isLength({ max: 50 }),
  body("profile.project.project_link").isURL().optional({ checkFalsy: true })
];

const recruiterSchema = [
  body("profile.first_name").exists({ checkFalsy: true }).isLength({ max: 25 }),
  body("profile.last_name").exists({ checkFalsy: true }).isLength({ max: 20 }),
  body("profile.organization")
    .exists({ checkFalsy: true })
    .isLength({ max: 50 }),
];

module.exports = {
  caseConversion,
  capitalizeFirst,
  userSchema,
  recruiterSchema,
};
