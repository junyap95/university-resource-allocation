import { useEffect, useState } from "react";
import FullCalendarView from "../Views/FullCalendarView";
import CircularProgress from "@mui/material/CircularProgress";
import { INITIAL_EVENTS } from "../helpers/event-utils";

const fetchAllocatedBookings = async () => {
  try {
    const response = await fetch("http://localhost:3001/get-allocated-bookings");
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error("Allocated bookings fetching error in DisplayCalendar component:", error);
  }
};

const getClientName = async (clientID) => {
  try {
    const params = { clientID: clientID };
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:3001/view-entry/client?${queryString}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Allocated bookings fetching error in DisplayCalendar component:", error);
  }
};

export default function DisplayCalendar() {
  const [loading, setLoading] = useState(true);
  const [calEvents, setCalEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { allocatedBookings } = (await fetchAllocatedBookings()) || {};

      if (!allocatedBookings || allocatedBookings.length === 0) {
        console.warn("No bookings found or error occurred during fetch.");
        setLoading(false);
        return;
      }

      const eventsArr = await Promise.all(
        allocatedBookings.map(async (booking) => {
          const [clientNameData] = await getClientName(booking.client_id);
          const clientName = clientNameData ? clientNameData.client_name : "Unknown Client";
          return {
            id: booking.request_id,
            title: `${clientName} / ${booking.client_id}`,
            start: `${booking.start_date}T${booking.start_time}`,
            end: `${booking.start_date}T${booking.end_time}`,
          };
        })
      );

      setCalEvents(eventsArr);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <CircularProgress color="inherit" />
          Loading from database
        </>
      ) : (
        <FullCalendarView eventsArray={calEvents?.length ? calEvents : INITIAL_EVENTS} />
      )}
    </>
  );
}
