import express from "express";
const router = express.Router();
import { dbPool } from "../configs/mysql.js";
import { nanoid } from "nanoid";

const insertClient = async (request) => {
  const clientID =
    request.firstName[0].toUpperCase() +
    request.lastName[0].toUpperCase() +
    nanoid(8);
  const { firstName, lastName, email, phoneNum } = request;
  try {
    // Check if a client with the same details already exists
    const [existingClients] = await dbPool.execute(
      "SELECT * FROM client WHERE first_name = ? AND last_name = ? AND email_address = ? AND phone_num = ?",
      [firstName, lastName, email, phoneNum],
    );

    // if exists, means it is the same person as before (all match), operation allowed
    // no new clientID is created, use the existing one
    const client = existingClients[0];
    if (existingClients.length > 0) {
      return {
        message: `Welcome back ${client.first_name} ${client.last_name}`,
        operation: true,
        clientID: client.client_id,
      };
    }

    const preparedStatement = `
      INSERT INTO client (client_id, first_name, last_name, email_address, phone_num)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result, fields] = await dbPool.execute(preparedStatement, [
      clientID,
      firstName,
      lastName,
      email,
      phoneNum,
    ]);
    console.log(result);
    console.log(fields);

    // to be passed down to the insertBooking function
    return {
      message: "Client inserted successfully",
      operation: true,
      clientID: clientID,
    };
  } catch (error) {
    // if one tries to use an email that already exists in the table
    // no new row will be created
    if (error.code === "ER_DUP_ENTRY") {
      return {
        message:
          "This email already exists, please use a different email address!",
        operation: false,
        clientID: undefined,
      };
    } else {
      console.error("Error Inserting Client: ", error);
      throw error;
    }
  }
};

const convertDateToSQLFormat = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

const insertBooking = async (request) => {
  const res = await insertClient(request);
  console.log("res inserting client", res);
  if (res.operation) {
    try {
      const requestID = nanoid(12);
      // this id is generated from insertClient function
      const clientID = res.clientID;
      const startDate = convertDateToSQLFormat(request.startDate);
      const startTime = request.startTime;
      const endTime = request.endTime;

      console.log(requestID, clientID, startDate, startTime, endTime);

      const preparedStatement = `
      INSERT INTO booking_request (request_id, client_id, start_date, start_time, end_time, booking_status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

      await dbPool.execute(preparedStatement, [
        requestID,
        clientID,
        startDate,
        startTime,
        endTime,
        "pending",
      ]);

      return {
        message: "Booking inserted successfully",
        operation: true,
        clientID: clientID,
        requestID: requestID,
      };
    } catch (error) {
      console.error("Error Inserting Booking Request: ", error);
      throw error;
    }
  } else {
    return { message: res.message, operation: false };
  }
};

router.post("/", async (req, res) => {
  try {
    const bookingRes = await insertBooking(req.body);
    console.log("booking result ", bookingRes);
    res.send(bookingRes);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Internal server error", error: error.message });
  }
});

export default router;
