import { useCallback, useState, useEffect } from "react";
import AllTables from "./AllTables";
import DateBasedAllocator from "./DateBasedAllocator";
import AllocationDetails from "./AllocationDetails";
import AcceptAllocAlert from "./AcceptAllocAlert";
import BBKbutton from "../BBKbutton";
import Footer from "../Footer";
import CircularProgress from "@mui/material/CircularProgress";
import NavigationBar from "../NavigationBar";
import HallSelector from "./HallSelector";
import { API_URL, TABLE_NAMES } from "helpers/client-constants";
import { isObjectEmpty, makeApiRequest } from "helpers/event-utils";

const fetchData = async () => {
  try {
    const response = await fetch(`${API_URL}/view-entry`); /** all tables data */
    return await response.json();
  } catch (error) {
    console.error("Error fetching data from DB, check if DB is online: ", error);
  }
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
    const message = await makeApiRequest(
      `${API_URL}/insert-allocated-request`,
      "POST",
      allocatedData
    );
    setInsertAllocMsg(message);
    // change booking status to "failed or allocated"
    await makeApiRequest(`${API_URL}/update-booking-status`, "POST", allocatedData);
    // then calendar always retrieves data from DB to display results
  }, [allocatedData]);

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

            {tableName === TABLE_NAMES.BOOKING && (
              <DateBasedAllocator
                bookingData={dataFromDB.allRequests}
                setAllocatedData={setAllocatedData}
                setHighlighted={setHighlighted}
                setResultGenerating={setResultGenerating}
              />
            )}

            {tableName === TABLE_NAMES.HALL && (
              <HallSelector hallData={dataFromDB.allHalls} setHighlighted={setHighlighted} />
            )}

            {isObjectEmpty(allocatedData) && !resultGenerating ? null : !resultGenerating ? (
              <AllocationDetails allocatedData={allocatedData} />
            ) : (
              <>
                <CircularProgress color="inherit" />
                Generating Result...
              </>
            )}

            {!isObjectEmpty(allocatedData) && !resultGenerating && (
              <BBKbutton
                btnText="Accept Allocation"
                btnClass="green-btn"
                handlerFn={handleAcceptAllocation}
                value={undefined}
                type={undefined}
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
