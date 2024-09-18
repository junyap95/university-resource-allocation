import solver from "javascript-lp-solver";
import { sortHallsByCapacity } from "./algorithms.js";
import { calculateSingleProfit, calculateTotalProfit } from "../utilities/allocationCalculator.js";
import {
  parseBookings,
  selectBestCombination,
  getHallConstraints,
} from "../utilities/milpUtils.js";

export const lpSolve = (bookingMap, hallMap) => {
  const sortedHalls = sortHallsByCapacity(hallMap);
  const allocatedRequests = [];

  for (const hall of sortedHalls) {
    // Create a new model
    const model = { optimize: { profit: "max", capacity: "max" }, opType: "max" };
    const unallocatedbookings = bookingMap
      // Filter to get unallocated requests
      .filter(
        (booking) => !allocatedRequests.some((alloc) => alloc.request_id === booking.request_id)
      );

    const filteredBookings = unallocatedbookings
      // Filter unallocated requests to match hall capacity
      .filter((booking) => booking.capacity <= hall.capacity);

    if (filteredBookings.length > 0) {
      const constraints = getHallConstraints(hall.capacity * filteredBookings.length);
      const { parsedBookings, ints } = parseBookings(filteredBookings);
      model.constraints = constraints;
      model.variables = parsedBookings;
      model.ints = ints;
      const { vertices, ranges } = solver.Solve(model);
      const selectedCombination = selectBestCombination(vertices, ranges);

      // Rest are the allocated bookingIDs
      const { bounded, isIntegral, profit, capacity, ...rest } = selectedCombination;
      Object.keys(rest).forEach((bookingId) => {
        const booking = bookingMap.find((booking) => booking.request_id === bookingId);
        if (rest[bookingId] === 1) {
          allocatedRequests.push({
            ...booking,
            hall_assigned: hall.id,
            profit: calculateSingleProfit(booking),
          });
        }
      });
    }
  }

  return {
    allocatedRequests,
    totalProfit: calculateTotalProfit(allocatedRequests),
    failedRequests: bookingMap.filter(
      (request) => !allocatedRequests.some((alloc) => alloc.request_id === request.request_id)
    ),
  };
};
