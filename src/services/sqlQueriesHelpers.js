import { dbPool } from "../configs/mysql.js";
import {
  STATUS_PENDING,
  STATUS_FAILED,
  STATUS_APPROVED,
} from "../utilities/constants.js";

export const getAllClients = async () => {
  try {
    const [rows] = await dbPool.query("SELECT * FROM client");
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
    throw err;
  }
};

export const getAllHalls = async () => {
  try {
    const [rows] = await dbPool.query("SELECT * FROM lecture_hall");
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
    throw err;
  }
};

export const getAllBookingRequests = async () => {
  try {
    const [rows] = await dbPool.query(
      "SELECT * FROM booking_request ORDER BY start_date DESC"
    );
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
    throw err;
  }
};

export const getAllBookingRequestsByDate = async (date) => {
  try {
    const [rows] = await dbPool.query(
      "SELECT * FROM booking_request WHERE start_date= ?",
      [date]
    );
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
    throw err;
  }
};

export const insertAllocatedRequest = async (allocatedData) => {
  try {
    const [rows] = await dbPool.query(
      "INSERT INTO allocated_bookings (hall_id, request_id) VALUES (?, ?)",
      [allocatedData.hall_assigned, allocatedData.request_id]
    );
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
    throw err;
  }
};

export const updateBookingStatus = async (allocatedData) => {
  try {
    const statusMsg = "PENDING";
    if (allocatedData.failedRequests.length > 0) {
      statusMsg = STATUS_FAILED;
    } else {
      statusMsg = STATUS_APPROVED;
    }
    // loop?
    await dbPool.query(
      "UPDATE booking_request SET booking_status = ? WHERE request_id = ? ",
      [statusMsg, allocatedData.request_id]
    );
  } catch (err) {
    console.error("Error executing query:", err.stack);
    throw err;
  }
};

export const checkBookingRequest = async (reqID) => {
  try {
    const [rows] = await dbPool.query(
      "SELECT * FROM booking_request b, client c WHERE b.client_id = c.client_id AND request_id = ? ",
      [reqID]
    );
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
    throw err;
  }
};

// select a client using name, email and number
export const selectClient = async (firstName, lastName, email, phoneNum) => {
  const [existingClients] = await dbPool.execute(
    "SELECT * FROM client WHERE first_name = ? AND last_name = ? AND email_address = ? AND phone_num = ?",
    [firstName, lastName, email, phoneNum]
  );
  return existingClients;
};

export const insertClientQuery = async (
  clientID,
  firstName,
  lastName,
  email,
  phoneNum
) => {
  const preparedStatement = `
      INSERT INTO client (client_id, first_name, last_name, email_address, phone_num)
      VALUES (?, ?, ?, ?, ?)
    `;
  await dbPool.execute(preparedStatement, [
    clientID,
    firstName,
    lastName,
    email,
    phoneNum,
  ]);
};

export const insertBookingQuery = async (
  requestID,
  clientID,
  startDate,
  startTime,
  endTime,
  capacity
) => {
  const preparedStatement = `
      INSERT INTO booking_request (request_id, client_id, start_date, start_time, end_time, capacity, booking_status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
  await dbPool.execute(preparedStatement, [
    requestID,
    clientID,
    startDate,
    startTime,
    endTime,
    capacity,
    STATUS_PENDING,
  ]);
};
