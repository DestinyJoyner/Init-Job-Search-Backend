const {query} = require("express-validator")

const jobQuerySchema = [
    query("start","start query value must be a positive integer greater than zero").exists({checkFalsy: true}).optional().isInt({ min : 0}),
    query("limit","limit query value must be a positive integer greater than 0 and less than 6").exists({checkFalsy: true}).optional().isInt({max: 25})
]

module.exports = {
    jobQuerySchema
}