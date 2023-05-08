const db = require("../db/dbConfig.js");

const createUserSkill = async ({
    user_id,
    skill_id
}) => {
    try {
        const newUserSkill = await db.one(
            "INSERT INTO users_skills (user_id, skill_id) VALUES ($1, $2) RETURNING *",
            [
                user_id,
                skill_id
            ]
        );
        return newUserSkill
    } catch (error) {
        return error;
    }
}

module.exports = {
    createUserSkill,
    // deleteUserSkill
}