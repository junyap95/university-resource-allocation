import DynamicTable from "./DynamicTable";
import Button from "../Button";

// show the corresponding table when a button is clicked
function AllTables({
  tableName,
  handleChangeTable,
  clientData,
  bookingData,
  hallData,
  highlightedDate,
}) {
  const tableNames = {
    client: clientData,
    booking: bookingData,
    hall: hallData,
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

      <DynamicTable data={tableNames[tableName]} highlightedDate={highlightedDate} />
    </>
  );
}
export default AllTables;
