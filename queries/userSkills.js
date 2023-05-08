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

const deleteUserSkill = async ({
    user_id,
    skill_id
}) => {
    try {
        const deletedSkill = await db.one("DELETE FROM users_skills WHERE user_id=$1 AND skill_id=$2 RETURNING *", [
            user_id,
            skill_id
        ])
        return deletedSkill

    } catch (error) {
        return error
    }
}

module.exports = {
    createUserSkill,
    deleteUserSkill
}