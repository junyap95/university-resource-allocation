import express from "express";
const router = express.Router();
import {
  getAllClients,
  getAllHalls,
  getAllBookingRequests,
} from "../services/sqlQueriesHelpers.js";

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const allClients = await getAllClients();
  const allHalls = await getAllHalls();
  const allRequests = await getAllBookingRequests();

  res.send({
    allClients: allClients,
    allHalls: allHalls,
    allRequests: allRequests,
  });
});

// note: called in ClientTable Component
export default router;
