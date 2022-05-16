require("dotenv").config();


const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    //below password is your postgres admin password
    password: process.env.MY_LOCAL_PASSWORD,
    database: "postgres"
})

module.exports = client