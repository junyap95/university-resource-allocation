import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { INITIAL_EVENTS } from "helpers/event-utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BBKbutton from "./BBKbutton";

export default function TestCal() {
  const [dataPassed, setDataPassed] = useState([]);
  const [eventDragged, setEventDragged] = useState(0);

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
          };
        },
      });
    }
  }, []);

  const handleEventClick = (info) => {
    info.event.remove();
    const requestChip = document.querySelector(`[data-title="${info.event._def.title}"]`);
    if (requestChip) requestChip.style.visibility = "visible";
    setEventDragged((prev) => prev - 1);
  };

  const handleDrop = (info) => {
    const draggedEl = info.draggedEl;
    draggedEl.style.visibility = "hidden";

    setEventDragged((prev) => prev + 1);
  };

  return (
    <CalContainer>
      <RequestContainer id="external-events">
        <HeaderText>Drag and Drop Requests on Calendar</HeaderText>
        <div>Failed Requests</div>
        {dataPassed.map((data, index) => (
          <TinyChip
            key={index}
            className="draggableEl"
            data-duration={data.duration}
            data-title={data.title}
          >
            {data.title}
          </TinyChip>
        ))}
        {eventDragged > 0 && <BBKbutton btnText="Submit Enquiry" />}
      </RequestContainer>
      <FullCalendar
        validRange={{ start: new Date() }}
        showNonCurrentDates={false}
        plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"timeGridWeek"}
        dayMaxEventRows={true}
        headerToolbar={{
          left: "prev next today",
          center: "title",
          right: "dayGridMonth timeGridWeek timeGridDay listYear",
        }}
        events={INITIAL_EVENTS}
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
`;

const HeaderText = styled.h3`
  text-align: center;
`;
