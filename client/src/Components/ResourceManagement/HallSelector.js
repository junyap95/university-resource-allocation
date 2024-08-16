import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "../Button";
import { useState, useCallback, useEffect } from "react";
import FullCalendarView from "../../Views/FullCalendarView";

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

export default function HallSelector({ hallData, setHighlighted }) {
  const [calEvents, setCalEvents] = useState([]);
  const [hallID, setHallID] = useState("1");
  const [displayCal, setDisplayCal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { allocatedBookings } = (await fetchAllocatedBookings()) || {};

      if (!allocatedBookings || allocatedBookings.length === 0) {
        console.warn("No bookings found or error occurred during fetch.");
        return;
      }

      const eventsArr = await Promise.all(
        allocatedBookings.map(async (booking) => {
          const [clientNameData] = await getClientName(booking.client_id);
          const clientName = clientNameData ? clientNameData.client_name : "Unknown Client";
          return {
            id: booking.request_id,
            title: `${clientName}`,
            start: `${booking.start_date}T${booking.start_time}`,
            end: `${booking.start_date}T${booking.end_time}`,
            hall_id: booking.hall_id,
          };
        })
      );
      setHighlighted(hallID);
      setCalEvents(eventsArr);
    };

    fetchData();
  }, [hallID, setHighlighted]);

  const handleChangeHall = useCallback(
    (event) => {
      setHallID(event.target.value);
      setHighlighted(event.target.value);
    },
    [setHighlighted]
  );

  const handleClick = useCallback(
    (e) => (displayCal ? setDisplayCal(false) : setDisplayCal(true)),
    [displayCal]
  );

  return (
    <>
      <div style={{ display: "flex", gap: "1em", alignItems: "center" }}>
        <Box sx={{ minWidth: 200 }}>
          <FormControl fullWidth>
            <InputLabel id="">Select a Hall</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id=""
              value={hallID}
              label="hall"
              onChange={handleChangeHall}
            >
              {hallData.map((hall, index) => (
                <MenuItem key={index} value={hall.hall_id}>
                  {hall.hall_id} - {hall.hall_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Button
          btnClass={"main-btn"}
          btnText={displayCal ? "Hide Calendar" : "View Calendar"}
          handlerFn={handleClick}
        />
      </div>
      {displayCal ? (
        <>
          <hr style={{ width: "70rem" }} />
          <div className="calendar-manager">
            <FullCalendarView
              headerText={`Hall ${hallID} (${hallData.find((e) => e.hall_id === hallID).hall_name}) - ${calEvents.filter((e) => e.hall_id === hallID).length} Event/s`}
              eventsArray={calEvents.filter((e) => e.hall_id === hallID)}
            />
          </div>
        </>
      ) : null}
    </>
  );
}
