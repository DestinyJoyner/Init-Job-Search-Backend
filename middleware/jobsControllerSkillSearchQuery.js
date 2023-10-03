function databaseSearchWithSkillsQueryString(skills) {
    let skillCount = undefined;
    let skillDbSyntax = undefined;
    if (skills) {
      const skillQueryArr = skills.split(",");
      skillCount = skillQueryArr.length;
      const addQueryText = skillQueryArr.map((skill) => `skill_id=${+skill}`);
      skillDbSyntax = addQueryText.join(" OR ");
    }
    return {
        skillCount : skillCount,
        skillDbSyntax : skillDbSyntax
    }
}

module.exports = {
    databaseSearchWithSkillsQueryString
}