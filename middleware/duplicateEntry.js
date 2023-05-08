// middleware version of duplicate entry validation -> Keeping as middleware code reference

const db = require("../db/dbConfig.js");

const checkDuplicate = async (req, res, next) => {
  try {
    const { user_id, job_id } = req.body;
    const match = await db.one(
      "SELECT * FROM users_jobs WHERE user_id=$1 AND job_id=$2",
      [user_id, job_id]
    );
  } catch (error) {
    return next();
  }
  return res.status(400).json({ error: "Entry already exists!" });
};

module.exports = { checkDuplicate };
