const { body } = require("express-validator")


const loginSchema = [
    body("login.email").exists({checkFalsy: true}).isEmail(),
    body("login.password").exists({checkFalsy: true}).isStrongPassword({minLength: 5,  minLowercase: 1, minUppercase: 1, minSymbols: 1, minNumbers: 1 }),
]

module.exports ={
    loginSchema,
}