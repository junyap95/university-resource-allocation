import { useCallback, useState, useEffect } from "react";
import AllTables from "./AllTables";
import DateBasedAllocator from "./DateBasedAllocator";
import AllocationDetails from "./AllocationDetails";
import AcceptAllocAlert from "./AcceptAllocAlert";
import Button from "./Button";
import Footer from "./Footer";
import NavigationBar from "./NavigationBar";

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
  const [highlightedDate, setHighlightedDate] = useState("");

  //   const [progress, setProgress] = useState(100);

  useEffect(() => {
    fetchData().then((data) => {
      console.log(" in use effect main ");
      setClientData(data.allClients);
      setHallData(data.allHalls);
      setBookingData(data.allRequests);
    });
  }, []);

  const handleAcceptAllocation = useCallback(async () => {
    if (Object.keys(allocatedData).length === 0) return;
    // takes allocated requests
    const [allocatedRequests] = allocatedData.allocatedRequests;
    // writes into DB
    const message = await insertAllocRequestSQL(allocatedRequests);
    setInsertAllocMsg(message);
    // change booking status to "failed or allocated"
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

  return (
    <>
      <NavigationBar color="nav-bar-red" />
      <div className="resource-management-container">
        <AllTables
          clientData={clientData}
          bookingData={bookingData}
          hallData={hallData}
          highlightedDate={highlightedDate}
          setHighlightedDate={setHighlightedDate}
          setAllocatedData={setAllocatedData}
          setHasBookings={setHasBookings}
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
