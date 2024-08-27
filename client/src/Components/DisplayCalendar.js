import { useEffect, useState } from "react";
import FullCalendarView from "../Views/FullCalendarView";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchAllocatedBookings, getClientName, INITIAL_EVENTS } from "../helpers/event-utils";
import { API_URL } from "helpers/client-constants";

export default function DisplayCalendar() {
  const [loading, setLoading] = useState(true);
  const [calEvents, setCalEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { allocatedBookings } = (await fetchAllocatedBookings(API_URL)) || {};

      if (!allocatedBookings || allocatedBookings.length === 0) {
        console.warn("No bookings found or error occurred during fetch.");
        setLoading(false);
        return;
      }

      const eventsArr = await Promise.all(
        allocatedBookings.map(async (booking) => {
          const [clientNameData] = await getClientName(booking.client_id, API_URL);
          const clientName = clientNameData ? clientNameData.client_name : "Unknown Client";
          return {
            id: booking.request_id,
            title: `${clientName} - Hall ${booking.hall_id}`,
            start: `${booking.start_date}T${booking.start_time}`,
            end: `${booking.start_date}T${booking.end_time}`,
            hall_id: booking.hall_id,
          };
        })
      );

      setCalEvents(eventsArr);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="calendar-manager full-screen">
      {loading ? (
        <>
          <CircularProgress color="inherit" />
          Loading from database
        </>
      ) : (
        <FullCalendarView
          headerText="ALL EVENTS"
          eventsArray={calEvents?.length ? calEvents : INITIAL_EVENTS}
          initalView={undefined}
        />
      )}
    </div>
  );
}
