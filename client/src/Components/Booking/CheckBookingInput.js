import FormInputBox from "./FormInputBox";
import { Alert } from "@mui/material";
import BBKbutton from "../BBKbutton";
import { useCallback } from "react";
import { API_URL } from "helpers/client-constants";

export default function CheckBookingInput({
  clientID,
  setClientID,
  setClientRequest,
  errorMsg,
  setErrorMsg,
  setBookingLoaded,
}) {
  const handleChangeInput = useCallback(
    (e) => {
      setClientID(e.target.value);
      setErrorMsg("");
    },
    [setClientID, setErrorMsg]
  );

  const handleCheckBooking = async (e) => {
    e.preventDefault();
    const params = { clientID };
    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await fetch(`${API_URL}/check-booking?${queryString}`);
      if (response.ok) {
        const result = await response.json();
        setClientRequest(result.bookingRequest);
        setBookingLoaded(true);
      } else {
        setErrorMsg("User not Found!");
        return;
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };
  return (
    <>
      <form
        onSubmit={handleCheckBooking}
        className="confirm-container"
        style={{ position: "relative" }}
      >
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
          required={false}
        />
        <BBKbutton btnClass={"green-btn"} btnText={"Check My Booking"} type={"submit"} />
        {errorMsg ? (
          <div style={{ position: "absolute", bottom: "-4rem" }}>
            <Alert severity={"error"} onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          </div>
        ) : null}
      </form>
    </>
  );
}
