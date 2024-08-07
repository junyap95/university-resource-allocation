import { dbPool } from "../configs/mysql.js";
import { STATUS_PENDING, STATUS_FAILED, STATUS_APPROVED } from "../utilities/constants.js";

export const getAllClients = async () => {
  try {
    const [rows] = await dbPool.query("SELECT * FROM client");
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
  }
};

export const getAllHalls = async () => {
  try {
    const [rows] = await dbPool.query("SELECT * FROM lecture_hall");
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
  }
};

export const getAllBookingRequests = async () => {
  try {
    const [rows] = await dbPool.query("SELECT * FROM booking_request ORDER BY start_date DESC");
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
  }
};

export const getAllBookingRequestsByDate = async (date) => {
  try {
    const [rows] = await dbPool.query("SELECT * FROM booking_request WHERE start_date= ?", [date]);
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
  }
};

export const insertAllocatedRequest = async (allocatedData) => {
  try {
    const successfulRequests = allocatedData.allocatedRequests;

    for (const request of successfulRequests) {
      await dbPool.query("INSERT INTO allocated_bookings (hall_id, request_id) VALUES (?, ?)", [
        request.hall_assigned,
        request.request_id,
      ]);
    }
  } catch (err) {
    throw err;
  }
};

export const updateBookingStatus = async (allocatedData) => {
  try {
    const successfulRequests = allocatedData.allocatedRequests;
    const failedRequests = allocatedData.failedRequests;
    // Function to update booking status
    const updateStatus = async (requests, status) => {
      for (const request of requests) {
        await dbPool.query("UPDATE booking_request SET booking_status = ? WHERE request_id = ?", [
          status,
          request.request_id,
        ]);
      }
    };
    await updateStatus(successfulRequests, STATUS_APPROVED);
    await updateStatus(failedRequests, STATUS_FAILED);
  } catch (err) {
    console.error("Error executing query:", err.stack);
  }
};

export const checkBookingRequest = async (reqID) => {
  try {
    const [rows] = await dbPool.query(
      "SELECT * FROM booking_request b, client c WHERE b.client_id = c.client_id AND request_id = ? ",
      [reqID]
    );
    let myHallName;
    if (rows[0].booking_status === STATUS_APPROVED) {
      const [myHall] = await getAllocatedHall(reqID);
      myHallName = myHall.hall_name;
      rows[0].alloc_hall = myHallName;
    }
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
  }
};

export const getAllocatedHall = async (reqID) => {
  try {
    const [rows] = await dbPool.query(
      "SELECT h.hall_name FROM allocated_bookings a, booking_request b, lecture_hall h WHERE a.hall_id = h.hall_id AND a.request_id = b.request_id AND a.request_id = ?",
      [reqID]
    );
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
  }
};

export const getAllocatedBookings = async () => {
  try {
    const [rows] = await dbPool.query(
      "SELECT b.request_id, b.client_id, b.start_date, b.start_time, b.end_time, h.hall_id, h.hall_name FROM allocated_bookings a, booking_request b, lecture_hall h WHERE a.hall_id = h.hall_id AND a.request_id = b.request_id"
    );
    return rows;
  } catch (err) {
    console.error("Error executing query:", err.stack);
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

export const insertClientQuery = async (clientID, firstName, lastName, email, phoneNum) => {
  const preparedStatement = `
      INSERT INTO client (client_id, first_name, last_name, email_address, phone_num)
      VALUES (?, ?, ?, ?, ?)
    `;
  await dbPool.execute(preparedStatement, [clientID, firstName, lastName, email, phoneNum]);
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
