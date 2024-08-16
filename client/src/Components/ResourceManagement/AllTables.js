import DynamicTable from "./DynamicTable";
import Button from "../Button";

import CircularProgress from "@mui/material/CircularProgress";

// show the corresponding table when a button is clicked
function AllTables({ tableName, handleChangeTable, dataFromDB, highlighted, loading }) {
  const tableNames = {
    client: dataFromDB.allClients,
    booking: dataFromDB.allRequests,
    hall: dataFromDB.allHalls,
  };

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
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <DynamicTable data={tableNames[tableName]} highlighted={highlighted} tableKey={tableName} />
      )}
    </>
  );
}
export default AllTables;
