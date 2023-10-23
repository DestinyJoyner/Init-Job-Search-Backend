const db = require("../db/dbConfig.js");

const getAllCompanies = async () => {
    try {
        const allCompanies = await db.any("SELECT * FROM company");
        return allCompanies
        
      } catch (error) {
        return error;
      }
} 

const getOneCompany = async (name) => {
    try {
        const companyDetails = await db.one("SELECT * FROM company WHERE LOWER(regexp_replace(company_name, ' ', '', 'g')) LIKE '$1'", name);
        return companyDetails
        
      } catch (error) {
        return error;
      }
}


module.exports = {
    getAllCompanies,
    getOneCompany
}