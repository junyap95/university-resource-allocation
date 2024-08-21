import express from "express";
const router = express.Router();
import { checkBookingRequest } from "../services/sqlQueriesHelpers.js";

router.get("/", async (req, res, next) => {
  const bookingRequest = await checkBookingRequest(req.query.clientID);
  if (bookingRequest === "404") {
    res.status(404).send();
  } else {
    res.send({
      bookingRequest,
    });
  }
});

export default router;
