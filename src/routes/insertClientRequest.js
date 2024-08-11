import express from "express";
const router = express.Router();
import { nanoid } from "nanoid";
import { convertDateToSQLFormat, generateClientID } from "../utilities/utils.js";
import {
  selectClient,
  insertClientQuery,
  insertBookingQuery,
} from "../services/sqlQueriesHelpers.js";

const insertClient = async (request) => {
  const clientID = generateClientID(request.firstName, request.lastName);
  const { firstName, lastName, email, phoneNum } = request;

  try {
    // Check if a client with the same details already exists
    const existingClients = await selectClient(firstName, lastName, email, phoneNum);

    if (existingClients.length > 0) {
      const client = existingClients[0];
      return {
        message: `Welcome back, ${client.first_name} ${client.last_name}`,
        operation: true,
        clientID: client.client_id,
      };
    }

    await insertClientQuery(clientID, firstName, lastName, email, phoneNum);

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
        message: "This email already exists, please use a different email address!",
        operation: false,
        clientID: undefined,
      };
    } else {
      console.error("Error Inserting Client: ", error);
      throw error;
    }
  }
};

const insertBooking = async (request, clientID) => {
  try {
    const requestID = nanoid(12);
    const startDate = convertDateToSQLFormat(request.startDate);
    const startTime = request.startTime;
    const endTime = request.endTime;
    const capacity = request.capacity;

    await insertBookingQuery(
      requestID,
      // clientID is generated from insertClient function
      clientID,
      startDate,
      startTime,
      endTime,
      capacity
    );

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
};

router.post("/", async (req, res) => {
  try {
    const clientRes = await insertClient(req.body);
    if (clientRes.operation) {
      const bookingRes = await insertBooking(req.body, clientRes.clientID);
      bookingRes.clientMsg = clientRes.message;
      res.send(bookingRes);
    } else {
      res.send(clientRes);
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
});

export default router;
