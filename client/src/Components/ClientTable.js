import { useCallback, useEffect, useState } from "react";
import DynamicTable from "./DynamicTable";
import DateBasedAllocator from "./DateBasedAllocator";
import ButtonGroup from '@mui/material/ButtonGroup';

const fetchData = async () => {
  // const delay = 750;
  try {
    // await new Promise((resolve) => setTimeout(resolve, delay));
    const response = await fetch("http://localhost:3001/view-all-bookings");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

// the idea of this component is when a button is clicked its corresponding table will be shown
function ClientTable() {
  const [clientData, setClientData] = useState([{}]);
  const [hallData, setHallData] = useState([{}]);
  const [bookingData, setBookingData] = useState([{}]);
  const [tableName, setTableName] = useState("client");
  const [hasBookings, setHasBookings] = useState(false);
  const [allocatedData, setAllocatedData] = useState();

  useEffect(() => {
    console.log("useEffect initialised");
    fetchData().then((data) => {
      setClientData(data.allClients);
      setHallData(data.allHalls);
      setBookingData(data.allRequests);
    });
  }, [tableName]);

  const tableNames = {
    client: clientData,
    booking: bookingData,
    hall: hallData,
  };

  const handleChangeTable = useCallback((e) => {
    const event = e.target.value;
    setTableName(event);
    if (event === "booking") {
      setHasBookings(true);
    } else {
      setHasBookings(false);
    }

  }, []);

  return (
    <>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <button
          className="btn search-button"
          type="button"
          value="client"
          onClick={handleChangeTable}
        >
          Client
        </button>
        <div>
          <button
            className="btn search-button"
            type="button"
            value="booking"
            onClick={handleChangeTable}
          >
            Booking
          </button>
          {hasBookings ? <DateBasedAllocator bookingData={bookingData} setAllocatedData={setAllocatedData} /> : null}
        </div>
        <button
          className="btn search-button"
          type="button"
          value="hall"
          onClick={handleChangeTable}
        >
          Hall
        </button>
      </ButtonGroup>
      <DynamicTable dataFromSQL={tableNames[tableName]} />
    </>
  );
}

export default ClientTable;
