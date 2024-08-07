import express from "express";
import { getAllocatedBookings } from "../services/sqlQueriesHelpers.js";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const allocatedBookings = await getAllocatedBookings();
  res.send({
    allocatedBookings,
  });
});

export default router;
