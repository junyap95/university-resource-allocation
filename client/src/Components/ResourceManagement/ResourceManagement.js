import { useCallback, useState, useEffect } from "react";
import AllTables from "./AllTables";
import DateBasedAllocator from "./DateBasedAllocator";
import AllocationDetails from "./AllocationDetails";
import AcceptAllocAlert from "./AcceptAllocAlert";
import Button from "../Button";
import Footer from "../Footer";
import CircularProgress from "@mui/material/CircularProgress";
import NavigationBar from "../NavigationBar";
import HallSelector from "./HallSelector";
import { API_URL } from "helpers/client-constants";

const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/view-entry`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data from DB, check if DB is online: ", error);
  }
};

const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export function ResourceManagement() {
  const [allocatedData, setAllocatedData] = useState({});
  const [dataFromDB, setDataFromDB] = useState(null);
  const [insertAllocMsg, setInsertAllocMsg] = useState(null);
  const [tableName, setTableName] = useState("client");
  const [highlighted, setHighlighted] = useState("");
  const [loading, setLoading] = useState(true);
  const [resultGenerating, setResultGenerating] = useState(true);

  useEffect(() => {
    fetchData()
      .then((data) => {
        if (!isObjectEmpty(data)) {
          setDataFromDB(data);
          setLoading(false);
          setResultGenerating(false);
        } else {
          console.warn("Data object is empty, check if DB is online");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [tableName]);

  const handleChangeTable = useCallback(
    (e) => {
      setHighlighted("");
      setTableName(e.target.value);
      setAllocatedData({});
      setInsertAllocMsg(null);
    },
    [setAllocatedData, setHighlighted]
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
      const response = await fetch(`${API_URL}/insert-allocated-request`, {
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
      console.error("Error inserting allocated request in ResourceManagement Component: ", error);
    }
  };

  const updateBookingStatusSQL = async (allocatedRequests) => {
    try {
      const response = await fetch(`${API_URL}/update-booking-status`, {
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
      console.error("Error updating booking status in ResourceManagement Component: ", error);
    }
  };

  return (
    <>
      <NavigationBar color="nav-bar-red" />
      <div className="resource-management-container">
        {loading ? (
          <>
            <CircularProgress color="inherit" />
            Loading from database
          </>
        ) : (
          <>
            <AllTables
              tableName={tableName}
              dataFromDB={dataFromDB}
              handleChangeTable={handleChangeTable}
              highlighted={highlighted}
              loading={loading}
            />

            {tableName === "booking" && (
              <DateBasedAllocator
                bookingData={dataFromDB.allRequests}
                setAllocatedData={setAllocatedData}
                setHighlighted={setHighlighted}
                setResultGenerating={setResultGenerating}
              />
            )}

            {tableName === "hall" && (
              <HallSelector hallData={dataFromDB.allHalls} setHighlighted={setHighlighted} />
            )}

            {!resultGenerating ? (
              <AllocationDetails allocatedData={allocatedData} />
            ) : (
              <>
                <CircularProgress color="inherit" />
                Generating Result...
              </>
            )}

            {!isObjectEmpty(allocatedData) && !resultGenerating && (
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
          </>
        )}
      </div>
      <Footer />
    </>
  );
}
