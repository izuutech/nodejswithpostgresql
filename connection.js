require("dotenv").config();


const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    //below password is your postgres admin password
    password: process.env.MY_LOCAL_PASSWORD,
    //i'm utilizing the default postgres database where i have already created my users table via 
    //the pgAdmin4 graphical interface
    database: "postgres"
})

module.exports = client