\c init_dev;

INSERT INTO users (
    first_name,
    last_name
) VALUES 
('Dan', 'Mazzilli'),
('Destiny', 'Joyner'),
('Jahaad', 'Petty');

INSERT INTO skills (
    skill_name
) VALUES
('JavaScript'),
('Express'),
('React');

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
    city
) VALUES 
('Junior Dev', 'Peloton', 'New York'),
('Full Stack Dev', 'Citi', 'Los Angeles'),
('Back End Engineer', 'NJ Path', 'Jersey City');

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
(2, 1, CURRENT_DATE),
(3, 3, CURRENT_DATE);
