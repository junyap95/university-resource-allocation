import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import randomColor from "randomcolor";
let currentColor = randomColor();
let lastHallId = null;
export default function FullCalendarView({ eventsArray, headerText, initalView }) {
  const htmlContent = (e) =>
    `<div>
      <div><strong>Client Details</strong></div>
      <p>${e.event._def.title} </p>
      <div><strong>Hall Allocated</strong></div>
      <p>${e.event._def.extendedProps.hall_id} </p>
      <div><strong>Request ID</strong></div>
      <p>${e.event._def.publicId}</p>
      <div><strong>Start Time</strong></div>
      <p>${e.event._instance.range.start.toTimeString()}</p>
      <div><strong>End Time</strong></div>
      <p>${e.event._instance.range.end.toTimeString()}</p>
    </div>`;
  const handleToolTip = (e) =>
    tippy(e.el, {
      content: htmlContent(e),
      allowHTML: true,
      arrow: true,
      delay: 0,
      duration: 1,
      appendTo: document.body,
    });

  const handleClickandCopyReqID = (e) => navigator.clipboard.writeText(e.event._def.publicId);
  return (
    <>
      <h1>{headerText}</h1>
      <FullCalendar
        showNonCurrentDates={false}
        plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={initalView ?? "dayGridMonth"}
        dayMaxEventRows={true}
        headerToolbar={{
          left: "prev next today",
          center: "title",
          right: "dayGridMonth timeGridWeek timeGridDay listYear",
        }}
        events={eventsArray.map((event) => {
          if (event.hall_id !== lastHallId) {
            currentColor = randomColor();
            lastHallId = event.hall_id;
          }
          return {
            ...event,
            backgroundColor: currentColor,
          };
        })}
        eventOrder={(a, b) => {
          // Extract hall numbers from titles
          const hallA = parseInt(a.title.split("Hall ")[1], 10);
          const hallB = parseInt(b.title.split("Hall ")[1], 10);
          // Compare hall numbers
          if (hallA < hallB) return -1;
          if (hallA > hallB) return 1;
          return 0;
        }}
        displayEventEnd={true}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        eventMouseEnter={handleToolTip}
        eventClick={handleClickandCopyReqID}
        // eventDidMount={handleToolTip}
      />
    </>
  );
}
