import DynamicTable from "./DynamicTable";

const AllocatedRequests = ({ allocatedData }) =>
  !!allocatedData.allocatedRequests?.length && (
    <>
      <h2>Allocated Request/s</h2>
      <DynamicTable data={allocatedData.allocatedRequests} />
      <h3>
        Profit based on duration:
        <span style={{ fontSize: "1.5em" }}> £{allocatedData.totalProfit}</span>
      </h3>
    </>
  );

const FailedRequests = ({ allocatedData }) =>
  !!allocatedData.failedRequests?.length && (
    <>
      <h2 style={{ color: "red" }}>Failed Request/s</h2>
      <DynamicTable data={allocatedData.failedRequests} />
    </>
  );

export default function AllocationDetails({ allocatedData }) {
  return (
    <>
      {Object.keys(allocatedData).length !== 0 && (
        <>
          <hr style={{ width: "60rem" }} />
          <AllocatedRequests allocatedData={allocatedData} />
          <FailedRequests allocatedData={allocatedData} />
        </>
      )}{" "}
    </>
  );
}
