import { useCallback, useEffect, useState } from "react";
import DynamicTable from "./DynamicTable";

const fetchData = async () => {
  // const delay = 750;
  try {
    // await new Promise((resolve) => setTimeout(resolve, delay));
    const response = await fetch("http://localhost:3001/users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

function ClientTable() {
  const [clientData, setClientData] = useState([{}]);
  const [hallData, setHallData] = useState([{}]);
  const [bookingData, setBookingData] = useState([{}]);
  const [tableName, setTableName] = useState("client");

  useEffect(() => {
    console.log("useEffect initialised");
    fetchData().then((data) => {
      console.log(" in", data);
      setClientData(data.allClients);
      setHallData(data.allHalls);
      setBookingData(data.allRequests);
    });
  }, []);

  const tableNames = {
    client: clientData,
    booking: bookingData,
    hall: hallData,
  };

  const handleChangeTable = useCallback((e) => {
    setTableName(e.target.value);
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
      <button
        className="search-button"
        type="button"
        value="booking"
        onClick={handleChangeTable}
      >
        Booking
      </button>
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
