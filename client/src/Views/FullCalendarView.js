import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import randomColor from "randomcolor";

export default function FullCalendarView({ eventsArray, headerText }) {
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
  const handleToolTip = (e) => {
    return tippy(e.el, {
      content: htmlContent(e),
      allowHTML: true,
      arrow: true,
      delay: 0,
      duration: 1,
      appendTo: document.body,
    });
  };

  const handleClickandCopyReqID = (e) => {
    navigator.clipboard.writeText(e.event._def.publicId);
  };

  return (
    <>
      <h1>{headerText}</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dayMaxEventRows={true}
        headerToolbar={{
          left: "prev next today",
          center: "title",
          right: "dayGridMonth timeGridWeek timeGridDay",
        }}
        events={eventsArray.map((event, index) => ({
          ...event,
          backgroundColor: randomColor(),
        }))}
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
