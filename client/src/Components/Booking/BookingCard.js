import BBKbutton from "Components/BBKbutton";
import { useCallback } from "react";
import { Link } from "react-router-dom";
import { timeDifference } from "helpers/event-utils";

export default function BookingCard({ clientRequest }) {
  const APPROVED_COLOR = (opacity) => `rgba(36, 114, 90, ${opacity})`;
  const FAILED_COLOR = (opacity) => `rgba(114, 36, 60, ${opacity})`;

  const handleCheckTimeSlot = useCallback(() => {
    const newMap = clientRequest
      .filter((cr) => cr.booking_status === "FAILED")
      .map((cr) => ({
        title: cr.request_id,
        duration: timeDifference(cr.start_time, cr.end_time),
      }));

    localStorage.setItem("failed-requests", JSON.stringify(newMap));
  }, [clientRequest]);

  return (
    <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
      {clientRequest &&
        clientRequest.map((r, index) => (
          <div
            key={index}
            title={`booking-${index}`}
            className="confirm-container"
            style={{
              display: "flex",
              backgroundColor:
                r.booking_status === "APPROVED" ? APPROVED_COLOR(0.1) : FAILED_COLOR(0.2),
            }}
          >
            <div>
              <strong>Booking ID: </strong> {r.request_id}
            </div>
            <div>
              <strong>Current Status: </strong>{" "}
              <u style={{ color: r.booking_status !== "APPROVED" && FAILED_COLOR(1) }}>
                {r.booking_status.toUpperCase()}
              </u>
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
            {r.booking_status === "FAILED" ? (
              <BBKbutton
                handlerFn={handleCheckTimeSlot}
                btnText={
                  <Link to="/test-cal" target="blank">
                    Check Other Timeslots
                  </Link>
                }
                btnClass="green-btn"
                value={undefined}
              />
            ) : null}
          </div>
        ))}
    </div>
  );
}
