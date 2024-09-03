import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BBKbutton from "../BBKbutton";
import FullCalendarView from "../../Views/FullCalendarView";
import { useState, useCallback, useEffect } from "react";
import { API_URL } from "helpers/client-constants";
import { fetchAllocatedBookings, getClientName } from "helpers/event-utils";

export default function HallSelector({ hallData, setHighlighted }) {
  const [calEvents, setCalEvents] = useState([]);
  const [hallID, setHallID] = useState("1");
  const [displayCal, setDisplayCal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { allocatedBookings } = (await fetchAllocatedBookings(API_URL)) || {};

      if (!allocatedBookings || allocatedBookings.length === 0) {
        console.warn("No bookings found or error occurred during fetch.");
        return;
      }

      const eventsArr = await Promise.all(
        allocatedBookings.map(async (booking) => {
          const [clientNameData] = await getClientName(booking.client_id, API_URL);
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

  const handleClick = useCallback((e) => setDisplayCal(!displayCal), [displayCal]);

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

        <BBKbutton
          btnClass={"main-btn"}
          btnText={displayCal ? "Hide Calendar" : "View Calendar"}
          handlerFn={handleClick}
        />
      </div>
      {displayCal ? (
        <>
          <hr style={{ width: "70rem" }} />
          <FullCalendarView
            headerText={`Hall ${hallID} (${hallData.find((e) => e.hall_id === hallID).hall_name}) - ${calEvents.filter((e) => e.hall_id === hallID).length} Event/s`}
            eventsArray={calEvents.filter((e) => e.hall_id === hallID)}
          />
        </>
      ) : null}
    </>
  );
}
