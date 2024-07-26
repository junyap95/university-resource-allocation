import express from "express";
const router = express.Router();
import { timeGreedy } from "../services/greedy.js";
import { dbPool, getAllBookingRequests } from "../configs/mysql.js";

// retrieving written booking requests from db
const bookingMap = await getAllBookingRequests();
console.log(bookingMap);

// const bookings = [
//   {
//     client_id: 1,
//     start_time: 1000,
//     end_time: 1200,
//     capacity: 50,
//   },
//   {
//     client_id: 3,
//     start_time: 1100,
//     end_time: 1300,
//     capacity: 40,
//   },
//   {
//     client_id: 2,
//     start_time: 1200,
//     end_time: 1400,
//     capacity: 30,
//   },
//   {
//     client_id: 4,
//     start_time: 900,
//     end_time: 1100,
//     capacity: 30,
//   },
//   {
//     client_id: 5,
//     start_time: 900,
//     end_time: 1100,
//     capacity: 50,
//   },
// ];

const lectureHalls = [
  {
    id: 1,
    capacity: 60,
  },
  {
    id: 2,
    capacity: 50,
  },
  {
    id: 3,
    capacity: 50,
  },
];

router.get("/", (req, res, next) => {
  const result = timeGreedy(bookingMap, lectureHalls);
  res.send(result);
});

export default router;
