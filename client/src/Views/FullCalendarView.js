import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCallback } from "react";
import tippy from "tippy.js";

export default function FullCalendarView({ eventsArray }) {
  const handleToolTip = useCallback((e) => {
    return tippy(e.el, {
      content: "My tooltip!",
    });
  }, []);

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
        events={eventsArray}
        displayEventEnd={true}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }}
        // eventMouseEnter={handleToolTip}
        eventClick={() => {
          alert("Event: ");
        }}
        eventDidMount={handleToolTip}
      />
    </div>
  );
}
