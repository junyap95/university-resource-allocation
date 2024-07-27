import express from "express";
const router = express.Router();
import { durationGreedy, timeGreedy } from "../services/greedy.js";
import { dbPool, getAllBookingRequests, getAllHalls } from "../configs/mysql.js";

// retrieving written booking requests from db
const allBookings = await getAllBookingRequests();
const allHalls = await getAllHalls();
console.log(allBookings, Object.keys(allBookings).length, "greedyalloc bookingmap");
console.log(allHalls, Object.keys(allHalls).length, "greedyalloc hallMap");

const bookingMap = allBookings.map(booking => ({
  client_id: booking.client_id,
  start_time: booking.start_time,
  end_time: booking.end_time,
  capacity: booking.capacity,
}))

const hallMap = allHalls.map(hall => ({
  id: hall.hall_id,
  capacity: hall.hall_size,
}))

console.log(bookingMap, "bookingMap");
console.log(hallMap, "hallMap");

router.get("/", (req, res, next) => {
  const result = timeGreedy(bookingMap, hallMap);
  // const result = durationGreedy(bookingMap, hallMap);
  res.send(result);
});

export default router;
