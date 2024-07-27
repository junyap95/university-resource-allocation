// helper function to convert time string to seconds in order to sort calculate
const timeStringToSeconds = (timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const timeStringParser = (timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(':');
  return hours + minutes;
}


/**
 * first algorithm test: allocate the longest duration
 */
export const durationGreedy = (bookingMap, hallMap) => {
  const sortedByDuration = [...bookingMap].sort((a, b) => {
    const duration1 = timeStringToSeconds(a.end_time) - timeStringToSeconds(a.start_time);
    const duration2 = timeStringToSeconds(b.end_time) - timeStringToSeconds(b.start_time);
    // if 2 durations are the same, compare their capacity instead, pick the one with higher capacity
    if (duration2 - duration1 === 0) return a.capacity - b.capacity;
    return duration2 - duration1;
  });

  console.log(bookingMap);
  const result = [];

  for (const booking of sortedByDuration) {
    // for this booking, find a hall
    // how is the hall's availability determined? loop through all the hall, see if it is assigned to anyone
    // or if it clashes with other times
    for (const hall of hallMap) {
      // test whether all elements in the array pass the callBackFn test
      // in the start, the array is always empty and will always return true
      const hallIsAvailable = result.every(
        (assigned) =>
          assigned.hall_assigned !== hall.id ||
          booking.start_time >= assigned.end_time ||
          booking.end_time <= assigned.start_time,
      );

      if (hall.capacity >= booking.capacity && hallIsAvailable) {
        result.push({
          ...booking,
          hall_assigned: hall.id,
        });
        // break because greedy algorithm stops whenever assigned
        break;
      }
    }
  }
  return result;
};

/**
 * second algorithm test: allocate the earliest start time
 */
export const timeGreedy = (bookingMap, hallMap) => {
  // sort bookings by start time
  const sortedBookings = [...bookingMap].sort(
    (a, b) => {
      const duration1 = timeStringToSeconds(a.end_time) - timeStringToSeconds(a.start_time);
      const duration2 = timeStringToSeconds(b.end_time) - timeStringToSeconds(b.start_time);
      if (a.start_time === b.start_time) return duration2 - duration1;
      return timeStringParser(a.start_time) - timeStringParser(b.start_time);
    }
  );

  console.log(bookingMap);
  const result = [];

  for (const booking of sortedBookings) {
    // for this booking, find a hall
    // how is the hall's availability determined? loop through all the hall, see if it is assigned to anyone
    // or if it clashes with other times
    for (const hall of hallMap) {
      // test whether all elements in the array pass the callBackFn test
      // in the start, the array is always empty and will always return true
      const hallIsAvailable = result.every(
        (assigned) =>
          assigned.hall_assigned !== hall.id ||
          booking.start_time >= assigned.end_time ||
          booking.end_time <= assigned.start_time,
      );

      if (hall.capacity >= booking.capacity && hallIsAvailable) {
        result.push({
          ...booking,
          hall_assigned: hall.id,
        });
        // break because greedy algorithm stops whenever assigned
        break;
      }
    }
  }
  return result;
};