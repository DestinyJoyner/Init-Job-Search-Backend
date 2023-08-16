const pgp = require("pg-promise")()
require("dotenv").config()

const {
    PG_HOST,
    PG_PORT,
    PG_DATABASE,
    PG_USER,
    PG_PASSWORD,
    CONNECTION_STRING
} = process.env

const cn = {
    host : PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USER,
    password: PG_PASSWORD
}

const db = pgp(CONNECTION_STRING)

module.exports = db