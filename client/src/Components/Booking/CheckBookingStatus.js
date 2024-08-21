import { useState } from "react";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import BookingCard from "./BookingCard";
import CheckBookingInput from "./CheckBookingInput";

export default function CheckBookingStatus() {
  const [clientID, setClientID] = useState("");
  const [clientRequest, setClientRequest] = useState("");
  const [bookingLoaded, setBookingLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  return (
    <>
      <NavigationBar color="nav-bar-red" />
      <div
        className="main-container"
        style={{ flexDirection: "column", minHeight: "60vh", alignItems: "center" }}
      >
        {bookingLoaded ? null : (
          <CheckBookingInput
            clientID={clientID}
            errorMsg={errorMsg}
            setClientRequest={setClientRequest}
            setErrorMsg={setErrorMsg}
            setClientID={setClientID}
            setBookingLoaded={setBookingLoaded}
          />
        )}

        {bookingLoaded ? (
          <BookingCard clientRequest={clientRequest} setBookingLoaded={setBookingLoaded} />
        ) : null}
      </div>
      <Footer />
    </>
  );
}
