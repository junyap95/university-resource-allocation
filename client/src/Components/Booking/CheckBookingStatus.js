import { useCallback, useState } from "react";
import FormInputBox from "./FormInputBox";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import Button from "../Button";

export default function CheckBookingStatus() {
  const [clientID, setClientID] = useState("");
  const [clientRequest, setClientRequest] = useState("");

  const handleCheckBooking = async () => {
    const params = {
      clientID: clientID,
    };
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await fetch(`http://localhost:3001/check-booking?${queryString}`);
      if (response.ok) {
        const result = await response.json();
        setClientRequest(result.bookingRequest);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleChangeInput = useCallback((e) => {
    setClientID(e.target.value);
  }, []);

  return (
    <>
      <NavigationBar color="nav-bar-red" />
      <div
        className="main-container"
        style={{ flexDirection: "column", minHeight: "60vh", alignItems: "center" }}
      >
        <div className="confirm-container">
          <h3 style={{ color: "#72243c" }}>CHECK BOOKING STATUS</h3>

          <FormInputBox
            title="Enter Your Client ID"
            placeholder="ex. JSabcdefg"
            onChange={handleChangeInput}
            value={clientID}
            type="text"
          />
          <FormInputBox
            placeholder="ex. john_smith@gmail.com"
            type="text"
            title="Enter Your Email Address"
          />
          <Button
            btnClass={"green-btn"}
            btnText={"Check My Booking"}
            handlerFn={handleCheckBooking}
          />
        </div>
        <div style={{ padding: "1rem", display: "flex", gap: "1rem" }}>
          {clientRequest &&
            clientRequest.map((r) => (
              <div
                className="confirm-container"
                style={{
                  display: "flex",
                  backgroundColor:
                    r.booking_status === "APPROVED"
                      ? "rgba(36, 114, 90, 0.2)"
                      : "rgba(114, 36, 60, 0.3)",
                }}
              >
                <div>
                  <strong>Booking ID: </strong> {r.request_id}
                </div>
                <div>
                  <strong>Current Booking Status: </strong> {r.booking_status?.toUpperCase()}
                </div>
                {r.hasOwnProperty("alloc_hall") && (
                  <div>
                    <strong>Hall Reserved: </strong>
                    <strong style={{ color: "#24725a" }}>{r.alloc_hall} Hall</strong>
                  </div>
                )}
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
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
