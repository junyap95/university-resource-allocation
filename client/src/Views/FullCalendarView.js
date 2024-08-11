import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import randomColor from "randomcolor";

export default function FullCalendarView({ eventsArray }) {
  const htmlContent = (e) =>
    `<div>
      <div><strong>Client Details</strong></div>
      <p>${e.event._def.title} </p>
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
      interactive: true,
      allowHTML: true,
      arrow: true,
      delay: 0,
      // duration: 1,
      appendTo: document.body,
    });
  };

  return (
    <div className="calendar-manager">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev next today", // will normally be on the left. if RTL, will be on the right
          center: "title",
          right: "dayGridMonth timeGridWeek timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        events={eventsArray.map((event, index) => ({
          ...event,
          backgroundColor: randomColor(),
        }))}
        // events={eventsArray}
        // eventColor="yellow"
        displayEventEnd={true}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        eventMouseEnter={handleToolTip}
        // eventClick={handleToolTip}
        // eventDidMount={handleToolTip}
      />
    </div>
  );
}
