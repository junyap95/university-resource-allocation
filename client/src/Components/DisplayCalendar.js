import { useEffect, useState } from "react";
import FullCalendarView from "../Views/FullCalendarView";
import { INITIAL_EVENTS } from "../helpers/event-utils";

const fetchAllocatedBookings = async () => {
  try {
    const response = await fetch("http://localhost:3001/get-allocated-bookings");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Events allocation error:", error);
  }
};

export default function DisplayCalendar() {
  const [calEvents, setCalEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { allocatedBookings } = await fetchAllocatedBookings();
      const eventsArr = allocatedBookings.map((booking) => ({
        id: booking.request_id,
        title: booking.request_id,
        start: `${booking.start_date}T${booking.start_time}`,
        end: `${booking.start_date}T${booking.end_time}`,
      }));

      setCalEvents(eventsArr);
    };
    fetchData();
  }, []);

  return (
    <>
      <FullCalendarView eventsArray={calEvents.length ? calEvents : INITIAL_EVENTS} />
    </>
  );
}
