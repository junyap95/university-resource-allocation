// Helper function to convert time string to seconds
const timeStringToSeconds = (timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return hours * 3600 + minutes * 60 + (seconds || 0);
};

// Helper function to parse time string to hours and minutes
const timeStringParser = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  console.log("time string parsed ", hours * 100 + minutes)
  return hours * 100 + minutes;
};

// Helper function to sort halls by capacity in ascending order
const sortHallsByCapacity = (hallMap) => {
  return [...hallMap].sort((a, b) => a.capacity - b.capacity);
};

// Helper function to check hall availability
const isHallAvailable = (result, hall, booking) => {
  return result.every(
    (assigned) =>
      assigned.hall_assigned !== hall.id ||
      booking.start_time >= assigned.end_time ||
      booking.end_time <= assigned.start_time
  );
};

// Helper function to sort bookings by duration
const sortBookingsByDuration = (bookingMap) => {
  return [...bookingMap].sort((a, b) => {
    const duration1 = timeStringToSeconds(a.end_time) - timeStringToSeconds(a.start_time);
    const duration2 = timeStringToSeconds(b.end_time) - timeStringToSeconds(b.start_time);

    // if 2 durations are not equal, sort them
    if (duration1 !== duration2) {
      return duration2 - duration1;
    }
    // if durations are equal sort them by earlier start time (ascending)
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

// Function to allocate the longest duration
export const durationGreedy = (bookingMap, hallMap) => {
  const sortedByDuration = sortBookingsByDuration(bookingMap);
  const sortedHalls = sortHallsByCapacity(hallMap);

  console.log(sortedByDuration);
  const allocatedRequests = [];
  const failedRequests = [];

  for (const request of sortedByDuration) {
    let isAllocated = false;
    for (const hall of sortedHalls) {
      if (hall.capacity >= request.capacity && isHallAvailable(allocatedRequests, hall, request)) {
        allocatedRequests.push({ ...request, hall_assigned: hall.id });
        isAllocated = true;
        break;
      }
    }
    if (!isAllocated) {
      failedRequests.push(request)
    }
  }
  return {
    allocatedRequests: allocatedRequests,
    failedRequests: failedRequests
  };
};

// Function to allocate the earliest start time
export const timeGreedy = (bookingMap, hallMap) => {
  const sortedBookings = sortBookingsByStartTime(bookingMap);
  const sortedHalls = sortHallsByCapacity(hallMap);

  console.log(sortedBookings, "sorted Bookings");
  const result = [];

  for (const booking of sortedBookings) {
    for (const hall of sortedHalls) {
      if (hall.capacity >= booking.capacity && isHallAvailable(result, hall, booking)) {
        result.push({ ...booking, hall_assigned: hall.id });
        break;
      }
    }
  }
  return result;
};