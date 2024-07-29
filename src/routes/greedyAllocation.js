import express from "express";
const router = express.Router();
import { durationGreedy, timeGreedy } from "../services/greedyAlgorithms.js";
import { dbPool, getAllBookingRequests, getAllBookingRequestsByDate, getAllHalls } from "../configs/mysql.js";

// retrieving booking requests from db
const allHalls = await getAllHalls();

const hallMap = allHalls.map(hall => ({
  id: hall.hall_id,
  capacity: hall.hall_size,
}))

router.post("/", async (req, res, next) => {
  // req.body from the caller: DateBasedAllocator
  const allBookingsByDate = await getAllBookingRequestsByDate(req.body.date);

  const bookingMap = allBookingsByDate.map(booking => ({
    client_id: booking.client_id,
    start_time: booking.start_time,
    end_time: booking.end_time,
    capacity: booking.capacity,
  }))

  // const resultTime = timeGreedy(bookingMap, hallMap);
  const resultDuration = durationGreedy(bookingMap, hallMap);

  res.send(resultDuration);
});

export default router;
