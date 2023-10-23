-- users
\copy users FROM '/Users/destinyjoyner/inIT-CSV-Files/init_users.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

-- logins
\copy logins FROM '/Users/destinyjoyner/inIT-CSV-Files/init_user_logins.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

-- skills
\copy skills FROM '/Users/destinyjoyner/inIT-CSV-Files/init_skills.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

-- users-skills
\copy users_skills FROM '/Users/destinyjoyner/inIT-CSV-Files/init_users_skills.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

-- recruiters
 \copy recruiters FROM '/Users/destinyjoyner/inIT-CSV-Files/init_recruiters.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

--  recruiter-logins
\copy recruiter_logins FROM '/Users/destinyjoyner/inIT-CSV-Files/init_recruiter_logins.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

-- jobs
\copy jobs FROM '/Users/destinyjoyner/inIT-CSV-Files/init_jobs.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

-- users-jobs
\copy users_jobs FROM '/Users/destinyjoyner/inIT-CSV-Files/init_users_jobs.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

-- jobs-skills
\copy jobs_skills FROM '/Users/destinyjoyner/inIT-CSV-Files/init_jobs_skills.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

--company
\copy company FROM '/Users/destinyjoyner/inIT-CSV-Files/companies_description_init.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

