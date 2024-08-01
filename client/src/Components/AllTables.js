import { useCallback, useEffect, useState } from "react";
import DynamicTable from "./DynamicTable";
import DateBasedAllocator from "./DateBasedAllocator";

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
function AllTables() {
  const [clientData, setClientData] = useState([{}]);
  const [hallData, setHallData] = useState([{}]);
  const [bookingData, setBookingData] = useState([{}]);
  const [tableName, setTableName] = useState("client");
  const [hasBookings, setHasBookings] = useState(false);
  const [allocatedData, setAllocatedData] = useState({});
  const [highlightedDate, setHighlightedDate] = useState('');

  useEffect(() => {
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
    setHighlightedDate('');
    const event = e.target.value;
    setTableName(event);
    if (event === "booking") {
      setHasBookings(true);
    } else {
      setHasBookings(false);
    }
    setAllocatedData({})

  }, []);

  return (
    <div className="all-table-container">
      <h1>Select a Table to View</h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          className="btn main-btn"
          type="button"
          value="client"
          onClick={handleChangeTable}
        >
          Client
        </button>

        <button
          className="btn main-btn"
          type="button"
          value="booking"
          onClick={handleChangeTable}
        >
          Booking
        </button>

        <button
          className="btn main-btn"
          type="button"
          value="hall"
          onClick={handleChangeTable}
        >
          Hall
        </button>
      </div>

      <div className="dynamic-table">
        <DynamicTable data={tableNames[tableName]} highlightedDate={highlightedDate} />
      </div>

      {hasBookings ?
        <div>
          <DateBasedAllocator bookingData={bookingData} setAllocatedData={setAllocatedData} setHighlightedDate={setHighlightedDate} />
          {!!allocatedData.allocatedRequests?.length && <><h3>Allocated Request/s</h3> <DynamicTable data={allocatedData.allocatedRequests} /></>}
          {!!allocatedData.failedRequests?.length && <><h3>Failed Request/s</h3> <DynamicTable data={allocatedData.failedRequests} /> </>}
        </div> : null}
    </div>
  );
}
export default AllTables;
