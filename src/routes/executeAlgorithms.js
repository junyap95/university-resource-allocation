import express from "express";
import { durationGreedy, timeGreedy, randomAssignment } from "../services/algorithms.js";
import { lpSolve } from "../services/lpSolver.js";
import { allocateRecursive } from "../services/dynamicAllocation.js";
import { getAllBookingRequestsByDate, getAllHalls } from "../services/sqlQueriesHelpers.js";
import {
  START_TIME_GREEDY,
  LONGEST_DURATION_GREEDY,
  RANDOM_ASSIGNMENT,
  BACKTRACKING,
  INTEGER_PROGRAMMING,
} from "../utilities/constants.js";
import { performance } from "perf_hooks";
import logger from "../utilities/logger.js";
const router = express.Router();

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
    // booking_status: booking.booking_status,
  }));

  // switch statement for greedy algorithm chosen by user
  function handleRequest(algorithm) {
    let allocationResults;
    const s = performance.now();

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

      case BACKTRACKING:
        allocationResults = allocateRecursive(0, [], bookingMap, hallMap);
        break;

      case INTEGER_PROGRAMMING:
        allocationResults = lpSolve(bookingMap, hallMap);
        break;

      default:
        logger.log(logger.level, "Unknown algorithm");
        break;
    }
    const e = performance.now();
    logger.log(
      logger.level,
      `Time Taken For ${algorithm} to run: ${((e - s) / 1000).toFixed(3)} seconds. Profit generated: £${allocationResults.totalProfit}.`
    );
    return allocationResults;
  }

  res.send(handleRequest(req.body.algorithm));
});

export default router;
