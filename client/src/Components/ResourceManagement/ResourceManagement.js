import { useCallback, useState, useEffect } from "react";
import AllTables from "./AllTables";
import DateBasedAllocator from "./DateBasedAllocator";
import AllocationDetails from "./AllocationDetails";
import AcceptAllocAlert from "./AcceptAllocAlert";
import Button from "../Button";
import Footer from "../Footer";
import NavigationBar from "../NavigationBar";

const fetchData = async () => {
  try {
    const response = await fetch("http://localhost:3001/view-all-bookings");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export function ResourceManagement() {
  const [hasBookings, setHasBookings] = useState(false);
  const [allocatedData, setAllocatedData] = useState({});
  const [clientData, setClientData] = useState([{}]);
  const [hallData, setHallData] = useState([{}]);
  const [bookingData, setBookingData] = useState([{}]);
  const [insertAllocMsg, setInsertAllocMsg] = useState(null);
  const [tableName, setTableName] = useState("client");
  const [highlightedDate, setHighlightedDate] = useState("");

  useEffect(() => {
    fetchData().then((data) => {
      setClientData(data.allClients);
      setHallData(data.allHalls);
      setBookingData(data.allRequests);
    });
  }, [tableName]);

  const handleChangeTable = useCallback(
    (e) => {
      setHighlightedDate("");
      setTableName(e.target.value);
      setHasBookings(e.target.value === "booking");
      setAllocatedData({});
    },
    [setAllocatedData, setHasBookings, setHighlightedDate]
  );

  const handleAcceptAllocation = useCallback(async () => {
    if (Object.keys(allocatedData).length === 0) return;
    // writes into DB
    const message = await insertAllocRequestSQL(allocatedData);
    setInsertAllocMsg(message);
    // change booking status to "failed or allocated"
    await updateBookingStatusSQL(allocatedData);
    // then calendar always retrieves data from DB to display results
  }, [allocatedData]);

  const insertAllocRequestSQL = async (allocatedRequests) => {
    try {
      const response = await fetch("http://localhost:3001/insert-allocated-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allocatedRequests),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const updateBookingStatusSQL = async (allocatedRequests) => {
    try {
      const response = await fetch("http://localhost:3001/update-booking-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allocatedRequests),
      });
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <>
      <NavigationBar color="nav-bar-red" />
      <div className="resource-management-container">
        <AllTables
          tableName={tableName}
          clientData={clientData}
          handleChangeTable={handleChangeTable}
          bookingData={bookingData}
          hallData={hallData}
          highlightedDate={highlightedDate}
        />

        {hasBookings && (
          <DateBasedAllocator
            bookingData={bookingData}
            setAllocatedData={setAllocatedData}
            setHighlightedDate={setHighlightedDate}
          />
        )}

        <AllocationDetails allocatedData={allocatedData} />

        {Object.keys(allocatedData).length !== 0 && (
          <Button
            btnText="Accept Allocation"
            btnClass="green-btn"
            handlerFn={handleAcceptAllocation}
          />
        )}
        {insertAllocMsg && (
          <AcceptAllocAlert
            severity={insertAllocMsg.sqlOperation ? "success" : "error"}
            message={insertAllocMsg.sqlMessage}
            onClose={setInsertAllocMsg}
          />
        )}
      </div>
      <Footer />
    </>
  );
}
