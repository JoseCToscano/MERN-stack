const mysql = require("mysql2/promise");
const password = require("../keys/dbpassword");

// create the connection to database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: password,
  port: "3306",
  database: "TO_DO_LIST"
});

module.exports = {
  pool
};
