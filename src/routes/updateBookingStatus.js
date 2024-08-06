import express from "express";
const router = express.Router();
import { updateBookingStatus } from "../services/sqlQueriesHelpers.js";

router.post("/", async (req, res, next) => {
  try {
    await updateBookingStatus(req.body);
    // res.send(SUCCESS_MESSAGE);
  } catch (error) {
    console.error("Error: ", error);
  }
});

export default router;
