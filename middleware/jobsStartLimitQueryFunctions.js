const {query} = require("express-validator")

const jobQuerySchema = [
    query("start","start query value must be a positive integer greater than zero").exists({checkFalsy: true}).optional().isInt({ min : 1})
]

module.exports = {
    jobQuerySchema
}