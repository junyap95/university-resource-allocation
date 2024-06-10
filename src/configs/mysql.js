/**
 * This file is to initialise the database
 * and export some functions to query the database
 */
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

// Create the connection to database
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export const getAllClients = () => {
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

export const dbPool = pool.promise();
