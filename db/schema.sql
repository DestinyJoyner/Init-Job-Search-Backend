DROP DATABASE IF EXISTS init_dev;
CREATE DATABASE init_dev;

\c init_dev;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL
);

DROP TABLE IF EXISTS skills;

CREATE TABLE skills (
    id SERIAL PRIMARY KEY,
    skill_name VARCHAR(25)
);

DROP TABLE IF EXISTS users_skills;

CREATE TABLE users_skills (
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills (id) ON DELETE CASCADE
);






-- psql JOIN command reference :
-- SELECT * FROM users_skills JOIN users ON users.id = users_skills.user_id JOIN skills ON skills.id = users_skills.skill_id  WHERE user_id= 2;