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
(3,2),
(2,2),
(1,2),
(2,3),
(3,3);