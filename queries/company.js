const db = require("../db/dbConfig.js");

const getAllCompanies = async (companyName) => {
  let allCompanies
  
    try {
      if(companyName){
        allCompanies = await db.any("SELECT company_name FROM company")
      }
      else {
        allCompanies = await db.any("SELECT * FROM company");
      }
        
        return allCompanies
        
      } catch (error) {
        return error;
      }
} 

const getOneCompany = async (name) => {
    try {
        const companyDetails = await db.one("SELECT * FROM company WHERE LOWER(regexp_replace(company_name, ' ', '', 'g')) LIKE $1", `%${name}%`);
        return companyDetails
        
      } catch (error) {
        return error;
      }
}


module.exports = {
    getAllCompanies,
    getOneCompany
}