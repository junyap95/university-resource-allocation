let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: "FAKE ID 1",
    title: "All-day event",
    start: "2024-08-16",
  },
  {
    id: "FAKE ID 2",
    title: "Timed event",
    start: todayStr + "T12:00:00",
    end: todayStr + "T16:00:00",
  },
];

export const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

export const fullCalEventObjParser = (events) => {
  return events.map((event) => ({
    id: event.request_id,
    title: event.alloc_hall
      ? `Event to be held at: ${event.alloc_hall} Hall`
      : `Request [${event.request_id}] failed. Please check your email inbox or call the university for more info`,
    start: `${event.start_date}T${event.start_time}`,
    end: `${event.start_date}T${event.end_time}`,
    booking_status: event.booking_status,
  }));
};

export const renderTableRows = (data, headers, highlighted) =>
  data.map((row, rowIndex) => {
    const isHighlighted = row.start_date === highlighted || row.hall_id === highlighted;
    return (
      <tr
        key={rowIndex}
        style={{
          backgroundColor: isHighlighted ? "rgba(114, 36, 60, 0.3)" : "transparent",
        }}
      >
        {Object.values(row).map((value, index) => (
          <td key={index}>
            {headers[index] === "start_date" ? new Date(value).toLocaleDateString() : value}
          </td>
        ))}
      </tr>
    );
  });

export const fetchAllocatedBookings = async (URL) => {
  try {
    const response = await fetch(`${URL}/get-allocated-bookings`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
    throw new Error("Something went wrong during fetching");
  } catch (error) {
    console.error("Allocated bookings fetching error in DisplayCalendar component:", error);
  }
};

export const getClientName = async (clientID, URL) => {
  try {
    const params = { clientID: clientID };
    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${URL}/view-entry/client?${queryString}`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error("Allocated bookings fetching error in DisplayCalendar component:", error);
  }
};
