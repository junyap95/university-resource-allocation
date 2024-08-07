import { useCallback, useState } from "react";
import FormInputBox from "./FormInputBox";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import Button from "../Button";

export default function CheckBookingStatus() {
  const [reqID, setReqID] = useState("");
  const [clientRequest, setClientRequest] = useState("");

  const handleCheckBooking = async () => {
    const params = { reqID: reqID };
    const queryString = new URLSearchParams(params).toString();
    try {
      const response = await fetch(`http://localhost:3001/check-booking?${queryString}`);
      if (response.ok) {
        const result = await response.json();
        const [parsedClientRequest] = result.bookingRequest;
        setClientRequest(parsedClientRequest);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleChangeInput = useCallback((e) => {
    setReqID(e.target.value);
  }, []);

  return (
    <>
      <NavigationBar color="nav-bar-red" />
      <div className="main-container" style={{ minHeight: "60vh", alignItems: "center" }}>
        <div className="confirm-container">
          <h3>Enter Your Request ID</h3>
          <FormInputBox
            placeholder="Your Request ID"
            onChange={handleChangeInput}
            value={reqID}
            type="text"
          />
          <Button
            btnClass={"green-btn"}
            btnText={"Check My Booking"}
            handlerFn={handleCheckBooking}
          />

          {clientRequest && (
            <>
              <h3>
                Hello {clientRequest.first_name} {clientRequest.last_name}
              </h3>
              <div>
                {" "}
                <strong>Current Booking Status: </strong>{" "}
                {clientRequest.booking_status?.toUpperCase()}
              </div>
              {clientRequest.hasOwnProperty("alloc_hall") && (
                <div>
                  <strong>Hall Reserved: </strong>
                  <strong style={{ color: "#24725a" }}>{clientRequest.alloc_hall} Hall</strong>
                </div>
              )}
              <div>
                <strong>Booking Date:</strong> {clientRequest.start_date}
              </div>
              <div>
                <strong>Start Time:</strong> {clientRequest.start_time}
              </div>
              <div>
                <strong>End Time:</strong> {clientRequest.end_time}
              </div>
              <div>
                <strong>Capacity:</strong> {clientRequest.capacity}
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
