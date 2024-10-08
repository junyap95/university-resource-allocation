import { useState, useCallback } from "react";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import styled from "styled-components";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import BookingCard from "./BookingCard";
import BBKbutton from "../BBKbutton";
import CheckBookingInput from "./CheckBookingInput";
import IndividualCalendarView from "./IndividualCalendarView";
import { fullCalEventObjParser } from "helpers/event-utils";

export default function CheckBookingStatus() {
  const [clientID, setClientID] = useState("");
  const [clientRequest, setClientRequest] = useState("");
  const [bookingLoaded, setBookingLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleGoBack = useCallback((e) => setBookingLoaded(false), [setBookingLoaded]);

  return (
    <>
      <NavigationBar color="nav-bar-red" />
      <MainContainer>
        {bookingLoaded ? (
          <BookingContent clientRequest={clientRequest} handleGoBack={handleGoBack} />
        ) : (
          <CheckBookingInput
            clientID={clientID}
            errorMsg={errorMsg}
            setClientRequest={setClientRequest}
            setErrorMsg={setErrorMsg}
            setClientID={setClientID}
            setBookingLoaded={setBookingLoaded}
          />
        )}
      </MainContainer>
      <Footer />
    </>
  );
}

function BookingContent({ clientRequest, handleGoBack }) {
  const [calendarMode, setCalendarMode] = useState(false);
  return (
    <>
      <ToggleContainer>
        <Title>
          <strong>Welcome To Your Bookings</strong> {clientRequest[0].client_name}
        </Title>

        <ToggleButtonGroup size="small" sx={{ paddingLeft: "2em", marginLeft: "auto" }}>
          <ToggleButton
            value="toggle-cal"
            selected={calendarMode}
            onChange={() => {
              setCalendarMode(true);
            }}
          >
            <ToggleContainer>
              Calendar
              <EventIcon />
            </ToggleContainer>
          </ToggleButton>
          <ToggleButton
            value="toggle-cards"
            selected={!calendarMode}
            onChange={() => {
              setCalendarMode(false);
            }}
          >
            <ToggleContainer>
              Cards
              <DashboardIcon />
            </ToggleContainer>
          </ToggleButton>
        </ToggleButtonGroup>
      </ToggleContainer>

      <ContentContainer>
        {calendarMode ? (
          <IndividualCalendarView clientRequest={fullCalEventObjParser(clientRequest)} />
        ) : (
          <BookingCard clientRequest={clientRequest} />
        )}
      </ContentContainer>

      <BBKbuttonContainer>
        <BBKbutton btnClass={"green-btn"} btnText={"ACCEPT BOOKINGS"} handlerFn={handleGoBack} />
        <BBKbutton btnClass={"main-btn"} btnText={"GO BACK"} handlerFn={handleGoBack} />
      </BBKbuttonContainer>
    </>
  );
}

const Title = styled.div`
  font-size: 2rem;
  color: #72243c;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  margin: 2rem auto;
  width: 65rem;
`;

const BBKbuttonContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 20rem;
  gap: 1em;
`;

const ContentContainer = styled.div`
  display: flex;
  min-height: 65vh;
  padding: 1em;
  align-items: flex-start;
  justify-content: flex-start;
  width: 65rem;
  border: solid #72243c 1px;
  border-radius: 20px;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
