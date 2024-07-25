/**
 * first algorithm test: allocate the earliest start time
 */
export const timeGreedy = (bookingMap, hallMap) => {
  // sort bookings by start time
  const sortedBookings = [...bookingMap].sort(
    (a, b) => a.start_time - b.start_time,
  );

  const sortedByDuration = [...bookingMap].sort((a, b) => {
    const duration1 = a.end_time - a.start_time;
    const duration2 = b.end_time - b.start_time;
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
 * allocates based on duration
 */
