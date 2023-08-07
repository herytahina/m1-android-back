const mysql = require('mysql2')

const dotenv = require("dotenv")
dotenv.config()

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME
}).promise()

module.exports = { 
    pool
};