import express from "express";
const router = express.Router();
import { dbPool } from "../configs/mysql.js";
import { nanoid } from "nanoid";

const insertClient = async (request) => {
  const clientID =
    request.firstName[0].toUpperCase() +
    request.lastName[0].toUpperCase() +
    nanoid(8);
  const firstName = request.firstName;
  const lastName = request.lastName;
  const email = request.email;
  const phoneNum = request.phoneNum;
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
    await dbPool.execute(preparedStatement, [
      clientID,
      firstName,
      lastName,
      email,
      phoneNum,
    ]);
    return { message: "Insert successful", operation: true };
  } catch (error) {
    // if one tries to use an email that already exists in the table
    // no new row will be created
    if (error.code === "ER_DUP_ENTRY") {
      return {
        message: "Client already exists",
        operation: false,
        clientID: undefined,
      };
    } else {
      console.error("Error Inserting Client: ", error);
      throw error;
    }
  }
};

const insertBooking = async (insertClient, request) => {
  const res = await insertClient(request);
  if (res.operation === true) {
    const requestID = nanoid(12);
    const clientID = res.clientID;
    // todo : retrieve request information
  }
};

router.post("/", async (req, res) => {
  try {
    const request = await req.body;
    const insertResult = await insertClient(request);
    console.log(insertResult);

    res.send({ test: "success" });
  } catch (e) {
    res.status(404).send(e);
  }
});

export default router;
