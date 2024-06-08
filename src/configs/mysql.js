/**
 * This file is to initialise the database
 * and export some functions to query the database
 */
const mysql = require("mysql2");
require("dotenv").config();

// Create the connection to database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const getAllClients = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM client", (err, rows, fields) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return reject(err);
      }
      return resolve(rows); // Send the rows as JSON response
    });
  });
};

module.exports = pool.promise();
