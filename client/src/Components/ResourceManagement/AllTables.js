import DynamicTable from "./DynamicTable";
import BBKbutton from "../BBKbutton";
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
        <BBKbutton
          btnText="Clients"
          btnClass="main-btn"
          handlerFn={handleChangeTable}
          value="client"
        />
        <BBKbutton
          btnText="All Bookings"
          btnClass="main-btn"
          handlerFn={handleChangeTable}
          value="booking"
        />

        <BBKbutton
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
