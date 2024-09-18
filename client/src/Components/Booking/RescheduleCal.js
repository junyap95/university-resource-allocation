import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import styled from "styled-components";
import BBKbutton from "../BBKbutton";
import Snackbar from "@mui/material/Snackbar";
import { fetchAllocatedBookings } from "helpers/event-utils";
import { API_URL } from "helpers/client-constants";

export default function RescheduleCal() {
  const [dataPassed, setDataPassed] = useState([]);
  const [eventDragged, setEventDragged] = useState(0);
  const [open, setOpen] = useState(false);
  const [calEvents, setCalEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { allocatedBookings } = (await fetchAllocatedBookings(API_URL)) || {};

      if (!allocatedBookings || allocatedBookings.length === 0) {
        console.warn("No bookings found or error occurred during fetch.");
        return;
      }

      const eventsArr = await Promise.all(
        allocatedBookings.map(async (booking) => {
          return {
            id: booking.request_id,
            title: `Other Event`,
            start: `${booking.start_date}T${booking.start_time}`,
            end: `${booking.start_date}T${booking.end_time}`,
            hall_id: booking.hall_id,
          };
        })
      );

      setCalEvents(eventsArr);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("failed-requests");
    const data = JSON.parse(storedData);
    setDataPassed(data);

    // Initialize draggable elements
    let draggableEl = document.getElementById("external-events");

    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: ".draggableEl",
        eventData: function (el) {
          return {
            title: el.innerText,
            duration: el.getAttribute("data-duration"),
            backgroundColor: "#72243c",
            groupId: el.getAttribute("data-group"),
          };
        },
      });
    }
  }, []);

  const handleEventClick = (info) => {
    if (info.event._def.groupId === "failed-requests") {
      setOpen(true);
      info.event.remove();
    }
    const requestChip = document.querySelector(`[data-title="${info.event._def.title}"]`);
    if (requestChip) requestChip.style.visibility = "visible";
    setEventDragged((prev) => prev - 1);
  };

  const handleDrop = (info) => {
    const draggedEl = info.draggedEl;
    draggedEl.style.visibility = "hidden";

    setEventDragged((prev) => prev + 1);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Request Removed!"
      />
      <CalContainer>
        <RequestContainer id="external-events">
          <HeaderText>Re-Schedule Your Requests</HeaderText>
          <div>
            Please drag and drop the unassigned requests onto the calendar in your preferred time
            slot to submit an inquiry.
          </div>
          {dataPassed.map((data, index) => (
            <TinyChip
              key={index}
              className="draggableEl"
              data-duration={data.duration}
              data-title={data.title}
              data-group={data.groupId}
            >
              {data.title}
            </TinyChip>
          ))}
          {eventDragged > 0 && <BBKbutton btnClass="main-btn" btnText="Enquire Now" />}
        </RequestContainer>
        <FullCalendar
          showNonCurrentDates={false}
          plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView={"timeGridWeek"}
          dayMaxEventRows={true}
          headerToolbar={{
            left: "prev next today",
            center: "title",
            right: "dayGridMonth timeGridWeek timeGridDay listYear",
          }}
          events={calEvents}
          displayEventEnd={true}
          eventTimeFormat={{
            hour: "numeric",
            minute: "2-digit",
            meridiem: "short",
          }}
          eventOverlap={false}
          editable={true}
          droppable={true}
          drop={handleDrop}
          eventClick={handleEventClick}
        />
      </CalContainer>
    </>
  );
}

const TinyChip = styled.button`
  font-weight: 600;
  border-radius: 1em;
  border: solid #72243c 1px;
  justify-content: center;
  background-color: transparent;
  align-items: center;
  color: #72243c;

  transition-timing-function: ease-in-out;
  font-size: 1em;

  &: hover {
    cursor: pointer;
    background-color: #72243c;
    color: #fff;
    transform: scale(1.1);
  }
`;

const CalContainer = styled.div`
  display: flex;
  padding: 2rem 5rem;
  gap: 1rem;
`;

const RequestContainer = styled.div`
  border: solid #72243c 1px;
  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: 1em;
  width: 20rem;
`;

const HeaderText = styled.h3`
  text-align: center;
`;
