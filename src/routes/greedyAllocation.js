import express from "express";
const router = express.Router();
import {
  durationGreedy,
  timeGreedy,
  randomGreedy,
} from "../services/greedyAlgorithms.js";
import {
  getAllBookingRequestsByDate,
  getAllHalls,
} from "../services/sqlQueriesHelpers.js";

// retrieving booking requests from db
const allHalls = await getAllHalls();

const hallMap = allHalls.map((hall) => ({
  id: hall.hall_id,
  capacity: hall.hall_size,
}));

router.post("/", async (req, res, next) => {
  // req.body from the caller: DateBasedAllocator
  // then helper that executes sql queries takes in the date (req.body.date)
  const allBookingsByDate = await getAllBookingRequestsByDate(req.body.date);

  const bookingMap = allBookingsByDate.map((booking) => ({
    request_id: booking.request_id,
    client_id: booking.client_id,
    start_time: booking.start_time,
    end_time: booking.end_time,
    capacity: booking.capacity,
  }));

  // switch statement for greedy algorithm chosen by user
  function handleRequest(algorithm) {
    let allocationResults;

    switch (algorithm) {
      case "timeGreedy":
        allocationResults = timeGreedy(bookingMap, hallMap);
        break;

      case "durationGreedy":
        allocationResults = durationGreedy(bookingMap, hallMap);
        break;

      case "randomGreedy":
        allocationResults = randomGreedy(bookingMap, hallMap);
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
