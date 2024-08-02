// Helper function to convert time string to seconds
const timeStringToSeconds = (timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return hours * 3600 + minutes * 60 + (seconds || 0);
};

// Helper function to parse time string to hours and minutes
const timeStringParser = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 100 + minutes;
};

// Helper function to sort halls by capacity in ascending order
const sortHallsByCapacity = (hallMap) => {
  return [...hallMap].sort((a, b) => a.capacity - b.capacity);
};

// Helper function to check hall availability
// time is converted from string HH:MM:SS to seconds to compare
const isHallAvailable = (result, hall, booking) => {
  return result.every(
    (assigned) => {
      return assigned.hall_assigned !== hall.id ||
        timeStringToSeconds(booking.start_time) >= timeStringToSeconds(assigned.end_time) ||
        timeStringToSeconds(booking.end_time) <= timeStringToSeconds(assigned.start_time)
    }
  );
};

// Helper function to sort bookings by duration
const sortBookingsByDuration = (bookingMap) => {
  return [...bookingMap].sort((a, b) => {
    const duration1 = timeStringToSeconds(a.end_time) - timeStringToSeconds(a.start_time);
    const duration2 = timeStringToSeconds(b.end_time) - timeStringToSeconds(b.start_time);
    if (duration1 !== duration2) {
      return duration2 - duration1;
    }
    return timeStringParser(a.start_time) - timeStringParser(b.start_time);
  });
};

// Helper function to sort bookings by start time
const sortBookingsByStartTime = (bookingMap) => {
  return [...bookingMap].sort((a, b) => {
    const duration1 = timeStringToSeconds(a.end_time) - timeStringToSeconds(a.start_time);
    const duration2 = timeStringToSeconds(b.end_time) - timeStringToSeconds(b.start_time);
    if (a.start_time === b.start_time) return duration2 - duration1;
    return timeStringParser(a.start_time) - timeStringParser(b.start_time);
  });
};

// Helper function to sort bookings randomly
const sortBookingsRandomly = (bookingMap) => {
  const bookingResult = [...bookingMap];
  for (let i = bookingResult.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bookingResult[i], bookingResult[j]] = [bookingResult[j], bookingResult[i]];
  }
  return bookingResult;

};

// General algorithm to allocate halls based on a sorting strategy
const allocateHalls = (bookingMap, hallMap, sortBookingsFn) => {
  const sortedBookings = sortBookingsFn(bookingMap);
  const sortedHalls = sortHallsByCapacity(hallMap);
  console.log(sortedBookings, " sb ")
  const allocatedRequests = [];
  const failedRequests = [];

  for (const request of sortedBookings) {
    let isAllocated = false;
    for (const hall of sortedHalls) {
      console.log("hall available ", isHallAvailable(allocatedRequests, hall, request))
      if (hall.capacity >= request.capacity && isHallAvailable(allocatedRequests, hall, request)) {
        allocatedRequests.push({ ...request, hall_assigned: hall.id });
        isAllocated = true;
        break;
      }
    }
    if (!isAllocated) {
      failedRequests.push(request);
    }
  }

  console.log("result, ", allocatedRequests, failedRequests)
  return {
    allocatedRequests,
    failedRequests,
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
export const randomGreedy = (bookingMap, hallMap) => {
  return allocateHalls(bookingMap, hallMap, sortBookingsRandomly)
}
