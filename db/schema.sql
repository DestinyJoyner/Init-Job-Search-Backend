DROP DATABASE IF EXISTS init_dev;
CREATE DATABASE init_dev;

\c init_dev;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(25) NOT NULL,
    last_name VARCHAR(25) NOT NULL,
    school VARCHAR(50) NOT NULL,
    bio VARCHAR(255),
    project_one TEXT DEFAULT 'no link',
    project_two TEXT DEFAULT 'no link'
);

DROP TABLE IF EXISTS logins;

CREATE TABLE logins (
    email VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE
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


DROP TABLE IF EXISTS jobs;

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    company VARCHAR(25) NOT NULL,
    city VARCHAR(25) NOT NULL,
    details VARCHAR(4000) NOT NULL,
    full_remote BOOL DEFAULT false
);

DROP TABLE IF EXISTS users_jobs;

CREATE TABLE users_jobs (
    user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
    job_id INTEGER REFERENCES jobs (id) ON DELETE CASCADE,
    date_applied DATE NOT NULL DEFAULT CURRENT_DATE
);

DROP TABLE IF EXISTS jobs_skills;

CREATE TABLE jobs_skills (
    job_id INTEGER REFERENCES jobs (id) ON DELETE CASCADE,
    skill_id INTEGER REFERENCES skills (id) ON DELETE CASCADE
);






-- psql JOIN command reference :
-- SELECT * FROM users_skills JOIN users ON users.id = users_skills.user_id JOIN skills ON skills.id = users_skills.skill_id  WHERE user_id= 2;
-- all job applications with user and job details
-- SELECT * FROM users_jobs JOIN users ON users.id = users_jobs.user_id JOIN jobs ON jobs.id = users_jobs.job_id;