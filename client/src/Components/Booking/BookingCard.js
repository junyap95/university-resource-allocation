export default function BookingCard({ clientRequest }) {
  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
      {clientRequest &&
        clientRequest.map((r, index) => (
          <div
            key={index}
            title={`container-${index}`}
            className="confirm-container"
            style={{
              display: "flex",
              backgroundColor:
                r.booking_status === "APPROVED"
                  ? "rgba(36, 114, 90, 0.1)"
                  : "rgba(114, 36, 60, 0.2)",
            }}
          >
            <div>
              <strong>Booking ID: </strong> {r.request_id}
            </div>
            <div>
              <strong>Current Booking Status: </strong> <u>{r.booking_status.toUpperCase()}</u>
            </div>
            <div>
              <strong>Booking Date:</strong> {r.start_date}
            </div>
            <div>
              <strong>Start Time:</strong> {r.start_time}
            </div>
            <div>
              <strong>End Time:</strong> {r.end_time}
            </div>
            <div>
              <strong>No. of Participants:</strong> {r.capacity}
            </div>
            {r.hasOwnProperty("alloc_hall") && (
              <div>
                <strong>Hall Reserved: </strong>
                <strong style={{ color: "#24725a" }}>{r.alloc_hall} Hall</strong>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
