import express from "express";
const router = express.Router();
import { checkBookingRequest } from "../services/sqlQueriesHelpers.js";

router.get("/", async (req, res, next) => {
  const bookingRequest = await checkBookingRequest(req.query.clientID);
  res.send({
    bookingRequest,
  });
});

export default router;
