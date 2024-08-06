import { useCallback, useEffect, useState } from "react";
import DynamicTable from "./DynamicTable";
import DateBasedAllocator from "./DateBasedAllocator";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

const fetchData = async () => {
  // const delay = 750;
  try {
    const response = await fetch("http://localhost:3001/view-all-bookings");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const insertAllocRequest = async (allocatedRequests) => {
  try {
    const response = await fetch(
      "http://localhost:3001/insert-allocated-request",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allocatedRequests),
      }
    );
    if (response.ok) {
      return await response.json();
    }
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
  const [highlightedDate, setHighlightedDate] = useState("");
  const [insertAllocMsg, setInsertAllocMsg] = useState("");

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
    setHighlightedDate("");
    const event = e.target.value;
    setTableName(event);
    if (event === "booking") {
      setHasBookings(true);
    } else {
      setHasBookings(false);
    }
    setAllocatedData({});
  }, []);

  const handleAcceptAllocation = useCallback(async () => {
    // takes allocated requests
    const [allocatedRequests] = allocatedData.allocatedRequests;
    // writes into DB
    const { sqlMessage } = await insertAllocRequest(allocatedRequests);
    setInsertAllocMsg(sqlMessage);
    // change booking status to "failed or allocated"

    // then calendar always retrieves data from DB to display results
  }, [allocatedData]);

  return (
    <>
      <NavigationBar color="nav-bar-red" />
      <div className="all-table-container">
        <h1 style={{ color: "#72243c" }}>Select a Table to View</h1>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="btn main-btn"
            type="button"
            value="client"
            onClick={handleChangeTable}
          >
            Clients
          </button>

          <button
            className="btn main-btn"
            type="button"
            value="booking"
            onClick={handleChangeTable}
          >
            Bookings
          </button>

          <button
            className="btn main-btn"
            type="button"
            value="hall"
            onClick={handleChangeTable}
          >
            Halls
          </button>
        </div>

        <div className="dynamic-table">
          <DynamicTable
            data={tableNames[tableName]}
            highlightedDate={highlightedDate}
          />
        </div>

        {hasBookings ? (
          <div>
            <DateBasedAllocator
              bookingData={bookingData}
              setAllocatedData={setAllocatedData}
              setHighlightedDate={setHighlightedDate}
            />

            {!!allocatedData.allocatedRequests?.length && (
              <>
                <h3>Allocated Request/s</h3>
                <DynamicTable data={allocatedData.allocatedRequests} />
                <h4>
                  Profit based on duration:{" "}
                  <span style={{ color: "#24725A", fontSize: "1.5em" }}>
                    £{allocatedData.totalProfit}
                  </span>
                </h4>
              </>
            )}

            {!!allocatedData.failedRequests?.length && (
              <>
                <h3>Failed Request/s</h3>{" "}
                <DynamicTable data={allocatedData.failedRequests} />{" "}
              </>
            )}
          </div>
        ) : null}
        <button
          className="btn main-btn"
          type="button"
          onClick={handleAcceptAllocation}
        >
          Accept Allocation
        </button>
        <p>{insertAllocMsg ? insertAllocMsg : null}</p>
      </div>
      <Footer />
    </>
  );
}
export default AllTables;
