import mysql from 'mysql2'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const seedQuery = fs.readFileSync("database/seeding.sql", {encoding: "utf-8"})

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
}).promise()

//Seed database first time, comment line below after seeding
const [result] = await pool.query(seedQuery)
export default pool 