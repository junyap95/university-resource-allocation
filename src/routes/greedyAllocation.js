import express from "express";
const router = express.Router();
import { timeGreedy } from "../services/greedy.js";

const bookings = [
  {
    client_id: 1,
    start_time: 900,
    end_time: 1100,
    capacity: 30,
  },
  {
    client_id: 2,
    start_time: 1000,
    end_time: 1230,
    capacity: 35,
  },
  {
    client_id: 3,
    start_time: 1200,
    end_time: 1500,
    capacity: 50,
  },
  {
    client_id: 4,
    start_time: 1300,
    end_time: 1500,
    capacity: 40,
  },
  {
    client_id: 5,
    start_time: 1400,
    end_time: 1600,
    capacity: 20,
  },
];

const lectureHalls = [
  {
    id: 1,
    capacity: 50,
  },
  {
    id: 2,
    capacity: 40,
  },
  {
    id: 3,
    capacity: 35,
  },
];

router.get("/", (req, res, next) => {
  const result = timeGreedy(bookings, lectureHalls);
  res.send(result);
});

export default router;
