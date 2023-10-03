function databaseSearchQueryString(input, city, remote, skillsObj, forCount=false) {
    const {skillDbSyntax } = skillsObj
    const inputQuery = input
    ? `  (
    (
  (LOWER(regexp_replace(title, ' ', '', 'g')) LIKE $3)  OR
  (LOWER(regexp_replace(city, ' ', '', 'g')) LIKE $3)  OR
  (LOWER(regexp_replace(details, ' ', '', 'g')) LIKE $3)  OR
  (LOWER(regexp_replace(company, ' ', '', 'g')) LIKE $3)
  ) 

)`
    : null;

  const cityQuery = city
    ? `LOWER(regexp_replace(city, ' ', '', 'g')) LIKE $4`
    : null;

  const remoteQuery =
    remote !== undefined
      ? `
  full_remote IS $5`
      : null;

  const whereKeyword =
    inputQuery || cityQuery || remoteQuery || skillDbSyntax
      ? `WHERE (
  ${skillDbSyntax ? skillDbSyntax : ""}
  ${skillDbSyntax && (inputQuery || cityQuery || remoteQuery) ? "AND" : ""}
  ${inputQuery ? inputQuery : ""}
  ${inputQuery && cityQuery ? "AND" : ""} 
  ${cityQuery ? cityQuery : ""}
  ${remoteQuery && (cityQuery || inputQuery) ? "AND" : ""}
  ${remoteQuery ? remoteQuery : ""}
)`
      : "";

  let dbCommand = skillDbSyntax
    ? `SELECT 
id, title, company, city, details, full_remote, tasks, recruiter_id
FROM jobs
INNER JOIN jobs_skills
ON jobs_skills.job_id=jobs.id 
${whereKeyword && whereKeyword}
GROUP BY jobs.id 
HAVING 
COUNT(job_id) = $7
ORDER BY id 
LIMIT $1  
OFFSET $2
`
    : `SELECT * 
FROM jobs
${whereKeyword && whereKeyword}
ORDER BY id 
LIMIT $1  
OFFSET $2
`;

let dbCommandCount = skillDbSyntax
? `SELECT 
COUNT(id)
FROM jobs
INNER JOIN jobs_skills
ON jobs_skills.job_id=jobs.id 
${whereKeyword && whereKeyword}

`
: `SELECT COUNT(id)
FROM jobs
${whereKeyword && whereKeyword}
`;

/* GROUP BY jobs.id 
HAVING 
COUNT(job_id) = $7
ORDER BY id  */
if(!forCount){
    return dbCommand
}
else {
    return dbCommandCount
}
}

module.exports = {
    databaseSearchQueryString
}