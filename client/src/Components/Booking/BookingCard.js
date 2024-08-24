import Button from "../Button";
import { useCallback } from "react";

export default function BookingCard({ clientRequest, setBookingLoaded }) {
  const handleGoBack = useCallback(
    (e) => {
      setBookingLoaded(false);
    },
    [setBookingLoaded]
  );
  return (
    <>
      <div style={{ color: "#72243c", fontSize: "2rem" }} key={clientRequest[0].client_name}>
        <strong>Welcome To Your Bookings </strong>
        {clientRequest[0].client_name}
      </div>

      <div style={{ padding: "3em", display: "flex", gap: "1rem" }}>
        {clientRequest &&
          clientRequest.map((r) => (
            <div
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
      <div style={{ display: "flex", flexDirection: "column", minWidth: "20rem", gap: "1em" }}>
        <Button btnClass={"green-btn"} btnText={"Accept Bookings"} handlerFn={handleGoBack} />
        <Button btnClass={"main-btn"} btnText={"Go Back"} handlerFn={handleGoBack} />
      </div>
    </>
  );
}
