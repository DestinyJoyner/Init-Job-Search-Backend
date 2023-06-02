require("dotenv").config();
const taskBreak = process.env.TASK_BREAK
const { body } = require("express-validator");

const taskFormat = (req, res, next) => {
  const { tasks } = req.body.jobDetails;
  req.body.jobDetails.tasks = tasks.join(`${taskBreak}`);
  next();
};

const jobSchema = [
    body("jobDetails.title").exists({checkFalsy: true}).isLength({ max: 100 }),
    body("jobDetails.company").exists({checkFalsy: true}).isLength({ max: 25 }),
    body("jobDetails.city").exists({checkFalsy: true}).isLength({ max: 25 }),
    body("jobDetails.details").exists({checkFalsy: true}).isLength({ max: 4000 }),
    body("jobDetails.full_remote").exists({checkFalsy: true}).isBoolean(),
    body("jobDetails.tasks").exists({checkFalsy: true}).isLength({ max: 2800 }),
    body("jobDetails.recruiter_id").exists({checkFalsy: true}),
]
module.exports = { taskFormat, jobSchema };
