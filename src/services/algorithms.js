import { timeStringToSeconds, timeStringToHoursAndMinutes } from "../utilities/utils.js";
import { calculateTotalProfit, calculateSingleProfit } from "../utilities/allocationCalculator.js";

export const sortHallsByCapacity = (hallMap) => {
  return [...hallMap].sort((a, b) => a.capacity - b.capacity);
};

// Helper function to check hall availability
// time is converted from string HH:MM:SS to seconds to compare
export const isHallAvailable = (assignedRequests, hall, booking) => {
  return assignedRequests.every((assigned) => {
    return (
      assigned.hall_assigned !== hall.id ||
      timeStringToSeconds(booking.start_time) >= timeStringToSeconds(assigned.end_time) ||
      timeStringToSeconds(booking.end_time) <= timeStringToSeconds(assigned.start_time)
    );
  });
};

// Helper function to sort bookings by duration
const sortBookingsByDuration = (bookingMap) => {
  return [...bookingMap].sort((a, b) => {
    const duration1 = timeStringToSeconds(a.end_time) - timeStringToSeconds(a.start_time);
    const duration2 = timeStringToSeconds(b.end_time) - timeStringToSeconds(b.start_time);
    if (duration1 !== duration2) {
      return duration2 - duration1;
    }
    return timeStringToHoursAndMinutes(a.start_time) - timeStringToHoursAndMinutes(b.start_time);
  });
};

// Helper function to sort bookings by start time
const sortBookingsByStartTime = (bookingMap) => {
  return [...bookingMap].sort((a, b) => {
    const duration1 = timeStringToSeconds(a.end_time) - timeStringToSeconds(a.start_time);
    const duration2 = timeStringToSeconds(b.end_time) - timeStringToSeconds(b.start_time);
    if (a.start_time === b.start_time) return duration2 - duration1;
    return timeStringToHoursAndMinutes(a.start_time) - timeStringToHoursAndMinutes(b.start_time);
  });
};

// Helper function to sort bookings randomly
const shuffleArray = (array) => {
  const shuffledResult = [...array];
  for (let i = shuffledResult.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledResult[i], shuffledResult[j]] = [shuffledResult[j], shuffledResult[i]];
  }
  return shuffledResult;
};

// General algorithm to allocate halls based on a sorting strategy
const allocateHalls = (bookingMap, hallMap, sortBookingsFn, sortHallsFn = sortHallsByCapacity) => {
  const sortedBookings = sortBookingsFn(bookingMap);
  const sortedHalls = sortHallsFn(hallMap);
  const allocatedRequests = [];
  const failedRequests = [];

  for (const request of sortedBookings) {
    let isAllocated = false;
    for (const hall of sortedHalls) {
      if (hall.capacity >= request.capacity && isHallAvailable(allocatedRequests, hall, request)) {
        // construct a result before pushing
        const allocatedRes = {
          ...request,
          hall_assigned: hall.id,
          space_utilised: `${request.capacity}/${hall.capacity}`,
        };
        // use the previous result to calculate profits per booking
        const profit = calculateSingleProfit(allocatedRes);
        // then push the existing result with profit calculated to the final array
        allocatedRequests.push({ ...allocatedRes, profit: profit });
        isAllocated = true;
        break;
      }
    }
    if (!isAllocated) {
      failedRequests.push(request);
    }
  }

  const totalProfit = calculateTotalProfit(allocatedRequests);

  return {
    allocatedRequests,
    failedRequests,
    totalProfit,
  };
};

// Function to allocate the longest duration
export const durationGreedy = (bookingMap, hallMap) => {
  return allocateHalls(bookingMap, hallMap, sortBookingsByDuration);
};

// Function to allocate the earliest start time
export const timeGreedy = (bookingMap, hallMap) => {
  return allocateHalls(bookingMap, hallMap, sortBookingsByStartTime);
};

// Function to allocate requests randomly
export const randomAssignment = (bookingMap, hallMap) => {
  return allocateHalls(bookingMap, hallMap, shuffleArray, shuffleArray);
};
