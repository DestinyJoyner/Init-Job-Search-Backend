\c init_dev;

INSERT INTO users (
    first_name,
    last_name,
    school,
    bio,
    project_one,
    project_two
) VALUES 
('Dan', 'Mazzilli', 'Pursuit', 'Interested in sustainability, sports analytics, and resource optimization.', 'link1', 'link2'),
('Destiny', 'Joyner', 'Pursuit', 'I like coding!', 'link1', 'link2'),
('Jahaad', 'Petty', 'Pursuit', 'I like potatoes!', 'link1', 'link2');

INSERT INTO logins (
    email,
    password,
    user_id
) VALUES
('dm@email.com', 'password', 1),
('dj@email.com', 'password', 2),
('jp@email.com', 'password', 3);

INSERT INTO skills (
    skill_name
) VALUES
('JavaScript'),
('Express'),
('React'),
('Python'),
('Java'),
('HTML'),
('CSS'),
('C++'),
('Ruby'),
('SQL'),
('Swift'),
('Go'),
('C'),
('C#'),
('PHP'),
;

INSERT INTO users_skills (
    user_id,
    skill_id
) VALUES 
(1,3),
(3,1),
(2,2),
(1,2),
(2,3),
(3,3);

INSERT INTO jobs (
    title,
    company,
    city,
    details,
    full_remote
) VALUES 
('Junior Dev', 'Peloton', 'New York', 'Come join our team in NYC!', false),
('Full Stack Dev', 'Citi', 'Los Angeles', 'CITI is the best place to work at!', true),
('Back End Engineer', 'NJ Path', 'Jersey City', 'Everyone loves NJ!', false);

INSERT INTO jobs_skills (
    job_id,
    skill_id
) VALUES
(1, 2),
(1, 3),
(2, 1),
(2, 2),
(3, 1),
(3, 3);

INSERT INTO users_jobs (
    user_id,
    job_id,
    date_applied
) VALUES
(1, 1, CURRENT_DATE),
(1, 2, CURRENT_DATE),
(2, 1, CURRENT_DATE),
(2, 3, CURRENT_DATE),
(3, 2, CURRENT_DATE),
(3, 3, CURRENT_DATE);
