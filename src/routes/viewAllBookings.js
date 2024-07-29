import express from "express";

const router = express.Router();

import {
  getAllClients,
  getAllHalls,
  getAllBookingRequests,
} from "../configs/mysql.js";

/* GET users listing. */
router.get("/", async (req, res, next) => {
  console.log("called");
  const allClients = await getAllClients();
  const allHalls = await getAllHalls();
  const allRequests = await getAllBookingRequests();

  res.send({
    allClients: allClients,
    allHalls: allHalls,
    allRequests: allRequests,
  });
});

export default router;
