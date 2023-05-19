const { body } = require("express-validator")



function capitalizeFirst(string){
    const newStr=  string.split(" ").map(el => 
        el[0].toUpperCase() + el.slice(1).toLowerCase()
    ).join(" ") 
    return newStr
}

const caseConversion = (req, res, next) => {
    const { first_name, last_name, } = req.body.profile
    if(req.body.login){
        req.body.login.email = req.body.login.email.toLowerCase()
    }
    req.body.profile["first_name"] = capitalizeFirst(first_name)
    req.body.profile["last_name"] = capitalizeFirst(last_name)
    next()
}

const userSchema = [
   body("profile.bio").exists({checkFalsy: true}).isLength({max: 255}),
   body("profile.education").exists({checkFalsy: true}).isLength({max: 50}),
   body("profile.project_one").isURL().optional({checkFalsy: true}),
   body("profile.project_two").isURL().optional({checkFalsy: true}),
]
module.exports = {
    caseConversion,
    capitalizeFirst,
    userSchema,
}