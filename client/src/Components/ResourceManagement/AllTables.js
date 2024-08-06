import { useCallback, useState } from "react";
import DynamicTable from "./DynamicTable";
import Button from "../Button";

// show the corresponding table when a button is clicked
function AllTables({
  clientData,
  bookingData,
  hallData,
  highlightedDate,
  setHighlightedDate,
  setHasBookings,
  setAllocatedData,
}) {
  const [tableName, setTableName] = useState("client");

  const tableNames = {
    client: clientData,
    booking: bookingData,
    hall: hallData,
  };

  const handleChangeTable = useCallback(
    (e) => {
      setHighlightedDate("");
      setTableName(e.target.value);
      setHasBookings(e.target.value === "booking");
      setAllocatedData({});
    },
    [setAllocatedData, setHasBookings, setHighlightedDate]
  );

  return (
    <>
      <h1 style={{ color: "#72243c" }}>Select a Table to View</h1>
      <div style={{ display: "flex", alignItems: "center", gap: "3em" }}>
        <Button
          btnText="Clients"
          btnClass="main-btn"
          handlerFn={handleChangeTable}
          value="client"
        />
        <Button
          btnText="All Bookings"
          btnClass="main-btn"
          handlerFn={handleChangeTable}
          value="booking"
        />

        <Button
          btnText="All Halls"
          btnClass="main-btn"
          handlerFn={handleChangeTable}
          value="hall"
        />
      </div>

      <DynamicTable data={tableNames[tableName]} highlightedDate={highlightedDate} />

      {/* {hasBookings && (
          <AllocationDetails
            bookingData={bookingData}
            setAllocatedData={setAllocatedData}
            setHighlightedDate={setHighlightedDate}
            allocatedData={allocatedData}
          />
        )}

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
            progress={progress}
          />
        )} */}
    </>
  );
}
export default AllTables;
