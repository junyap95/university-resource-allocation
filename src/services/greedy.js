/**
 * first algorithm test: allocate the earliest start time
 */

const timeGreedy = (bookingMap, hallMap) => {
  // sort bookings by start time
  const sortedBookings = bookingMap.sort((a, b) => a.start_time - b.start_time);
  console.log(sortedBookings);

  const result = [];

  for (const booking of sortedBookings) {
    // for this booking, find a hall
    // how is the hall's availability determined? loop through all the hall, see if it is assigned to anyone
    // or if it clashes with other times
    for (const hall of hallMap) {
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

module.exports = { timeGreedy };
