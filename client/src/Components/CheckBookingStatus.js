import { useCallback, useState } from "react";
import FormInputBox from "./FormInputBox";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

export default function CheckBookingStatus() {
    const [reqID, setReqID] = useState("");
    const [clientRequest, setClientRequest] = useState("");

    const handleCheckBooking = async () => {
        const params = { reqID: reqID };
        const queryString = new URLSearchParams(params).toString();
        try {
            const response = await fetch(`http://localhost:3001/check-booking?${queryString}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const result = await response.json();
            const [parsedClientRequest] = result.bookingRequest;
            setClientRequest(parsedClientRequest);
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    }

    const handleChangeInput = useCallback((e) => {
        setReqID(e.target.value);
    }, [])

    return (
        <>
            <NavigationBar color="nav-bar-red" />
            <div className="main-container" style={{ minHeight: "60vh", alignItems: "center" }}>
                <div className="confirm-container" >
                    <FormInputBox title="Enter Your Request ID" placeholder="Your Request ID" onChange={handleChangeInput} value={reqID} type="text" />
                    <button
                        className="btn main-btn"
                        type="button"
                        onClick={handleCheckBooking}
                        style={{ backgroundColor: "#24725A", border: "none", color: "#ffffff", margin: "1em 0" }}
                    >
                        Check My Booking
                    </button>
                    {clientRequest &&
                        <>
                            <h3>Hello {clientRequest.first_name} {clientRequest.last_name}</h3>
                            <p>Current Booking Status: {clientRequest.booking_status?.toUpperCase()}</p>
                            <p>Booking Date: {clientRequest.start_date}</p>
                            <p>Start Time: {clientRequest.start_time}</p>
                            <p>End Time: {clientRequest.start_time}</p>
                            <p>Capacity: {clientRequest.capacity}</p>
                        </>
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
