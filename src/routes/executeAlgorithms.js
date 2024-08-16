import express from "express";
const router = express.Router();
import { durationGreedy, timeGreedy, randomAssignment } from "../services/algorithms.js";
import { allocateRecursive } from "../services/dynamicAllocation.js";
import { getAllBookingRequestsByDate, getAllHalls } from "../services/sqlQueriesHelpers.js";
import {
  START_TIME_GREEDY,
  LONGEST_DURATION_GREEDY,
  RANDOM_ASSIGNMENT,
  DYNAMIC_PROGRAMMING,
} from "../utilities/constants.js";
import { performance } from "perf_hooks";

router.post("/", async (req, res, next) => {
  // retrieving booking requests from db
  const allHalls = await getAllHalls();
  const hallMap = allHalls.map((hall) => ({
    id: hall.hall_id,
    capacity: hall.hall_size,
  }));
  // req.body from the caller: DateBasedAllocator
  // then executes sql queries with the provided date (req.body.date)
  const allBookingsByDate = await getAllBookingRequestsByDate(req.body.date);

  const bookingMap = allBookingsByDate.map((booking) => ({
    request_id: booking.request_id,
    client_id: booking.client_id,
    start_time: booking.start_time,
    end_time: booking.end_time,
    capacity: booking.capacity,
    booking_status: booking.booking_status,
  }));

  console.log(
    "filtered",
    bookingMap.filter((e) => e.booking_status === "PENDING")
  );

  // switch statement for greedy algorithm chosen by user
  function handleRequest(algorithm) {
    let allocationResults;

    switch (algorithm) {
      case START_TIME_GREEDY:
        allocationResults = timeGreedy(bookingMap, hallMap);
        break;

      case LONGEST_DURATION_GREEDY:
        allocationResults = durationGreedy(bookingMap, hallMap);
        break;

      case RANDOM_ASSIGNMENT:
        allocationResults = randomAssignment(bookingMap, hallMap);
        break;

      case DYNAMIC_PROGRAMMING:
        const s = performance.now();
        allocationResults = allocateRecursive(0, [], bookingMap, hallMap);
        const e = performance.now();
        break;

      default:
        console.log("Unknown algorithm");
        break;
    }
    return allocationResults;
  }

  res.send(handleRequest(req.body.algorithm));
});

export default router;
