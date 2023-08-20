-- recruiters
 \copy recruiters FROM '/Users/destinyjoyner/inIT-CSV-Files/init_recruiters.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

--  recruiter-logins
\copy recruiter_logins FROM '/Users/destinyjoyner/inIT-CSV-Files/init_recruiter_logins.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

-- jobs
\copy jobs FROM '/Users/destinyjoyner/inIT-CSV-Files/init_jobs.csv' WITH (FORMAT CSV,HEADER true, DELIMITER ',');

-- job-skills

