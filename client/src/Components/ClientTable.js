import { useCallback, useEffect, useState } from "react";
import DynamicTable from "./DynamicTable";

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

  useEffect(() => {
    console.log("useEffect initialised");
    fetchData().then((data) => {
      console.log(" in", data);
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
      <button
        className="search-button"
        type="button"
        value="client"
        onClick={handleChangeTable}
      >
        Client
      </button>
      <div>
        <button
          className="search-button"
          type="button"
          value="booking"
          onClick={handleChangeTable}
        >
          Booking
        </button>
        {hasBookings ? <div>Hi</div> : null}
      </div>
      <button
        className="search-button"
        type="button"
        value="hall"
        onClick={handleChangeTable}
      >
        Hall
      </button>
      <DynamicTable dataFromSQL={tableNames[tableName]} />


    </>
  );
}

export default ClientTable;
