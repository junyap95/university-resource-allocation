import express from "express";
const router = express.Router();
import {
  getAllClients,
  getAllHalls,
  getAllBookingRequests,
  selectClientbyID,
} from "../services/sqlQueriesHelpers.js";

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    // better to execute asynchronous operations in parallel using Promise.all if they don't depend on each other.
    const [allClients, allHalls, allRequests] = await Promise.all([
      getAllClients(),
      getAllHalls(),
      getAllBookingRequests(),
    ]);

    res.send({
      allClients: allClients,
      allHalls: allHalls,
      allRequests: allRequests,
    });
  } catch (error) {
    next(error);
  }
});

// New endpoint to get client by ID
router.get("/client/", async (req, res, next) => {
  try {
    const clientID = req.query.clientID;
    const client = await selectClientbyID(clientID);
    res.send(client);
  } catch (error) {
    next(error); // Passes the error to the error handling middleware
  }
});

// note: called in ResourceManagement Component
export default router;
