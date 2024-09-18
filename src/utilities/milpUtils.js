import { timeStringToHoursAndMinutes } from "../utilities/utils.js";
import { calculateSingleProfit } from "../utilities/allocationCalculator.js";
export const LPSOLVER_HALL_CONSTRAINTS = {
  h6: { max: 1 },
  "h6.5": { max: 1 },
  h7: { max: 1 },
  "h7.5": { max: 1 },
  h8: { max: 1 },
  "h8.5": { max: 1 },
  h9: { max: 1 },
  "h9.5": { max: 1 },
  h10: { max: 1 },
  "h10.5": { max: 1 },
  h11: { max: 1 },
  "h11.5": { max: 1 },
  h12: { max: 1 },
  "h12.5": { max: 1 },
  h13: { max: 1 },
  "h13.5": { max: 1 },
  h14: { max: 1 },
  "h14.5": { max: 1 },
  h15: { max: 1 },
  "h15.5": { max: 1 },
  h16: { max: 1 },
  "h16.5": { max: 1 },
  h17: { max: 1 },
  "h17.5": { max: 1 },
  h18: { max: 1 },
  "h18.5": { max: 1 },
  h19: { max: 1 },
  "h19.5": { max: 1 },
  h20: { max: 1 },
  "h20.5": { max: 1 },
  h21: { max: 1 },
  "h21.5": { max: 1 },
};

export const getHallConstraints = (capacity) => {
  return {
    capacity,
    ...LPSOLVER_HALL_CONSTRAINTS,
  };
};

export function parseBookings(bookingMap) {
  const parsedBookings = {};
  const ints = {};

  bookingMap.forEach((booking) => {
    const currentBookingID = booking.request_id;
    ints[currentBookingID] = 1;

    parsedBookings[currentBookingID] = createBookingObject(booking);
  });

  return { parsedBookings, ints };
}

function createBookingObject(booking) {
  const bookingDuration = durationChecker(booking);
  const startTime = startTimeChecker(booking.start_time);

  const timeslot = createTimeslot(startTime, bookingDuration);

  return {
    ...timeslot,
    capacity: Number(booking.capacity),
    profit: calculateSingleProfit(booking),
  };
}

function createTimeslot(startTime, bookingDuration) {
  const timeslot = {};
  for (let j = 0; j < bookingDuration * 2; j++) {
    timeslot[`h${startTime + j / 2}`] = 1;
  }
  return timeslot;
}

function durationChecker(b) {
  return (
    (timeStringToHoursAndMinutes(b.end_time) - timeStringToHoursAndMinutes(b.start_time)) / 100
  );
}
function startTimeChecker(timeStr) {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours + minutes / 60;
}

export function selectBestCombination(vertices, ranges) {
  if (vertices.length === 1) {
    return vertices[0];
  }

  const maxProfitVertices = vertices.filter((vertex) => vertex.profit === ranges.profit.max);

  return maxProfitVertices.length === 1
    ? maxProfitVertices[0]
    : maxProfitVertices.sort((a, b) => b.capacity - a.capacity)[0];
}
