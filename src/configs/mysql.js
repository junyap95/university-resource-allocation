/**
 * This file is to initialise the database
 * and export various database queries
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
  port: process.env.DB_PORT,
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

export const getAllHalls = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM lecture_hall", (err, rows, fields) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return reject(err);
      }
      return resolve(rows); // Send the rows as JSON response
    });
  });
};

export const getAllBookingRequests = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM booking_request ORDER BY start_date DESC", (err, rows, fields) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return reject(err);
      }
      return resolve(rows); // Send the rows as JSON response
    });
  });
};

export const getAllBookingRequestsByDate = (date) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM booking_request WHERE start_date= ?", [date], (err, rows, fields) => {
      if (err) {
        console.error("Error executing query:", err.stack);
        return reject(err);
      }
      return resolve(rows); // Send the rows as JSON response
    });
  });
};

export const updateBookingStatus = () => {
  return new Promise((resolve, reject) => {
    pool.query("UPDATE booking_request SET booking_status = ? WHERE ")
  })
}

export const dbPool = pool.promise();
