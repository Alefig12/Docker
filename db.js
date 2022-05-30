var mysql = require('mysql')
require('dotenv').config();

var connect = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    database:process.env.DB_NAME || 'users',
    user:process.env.DB_USER || 'root',
    password:process.env.DB_PW || 'root',
    port:process.env.DB_PORT || '3000'
})

module.exports = connect;