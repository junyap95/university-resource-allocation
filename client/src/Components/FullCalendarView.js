import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function FullCalendarView({ eventsArray }) {
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
        events={eventsArray
          //   [
          //   { id: "c1", title: "event 1", start: "2024-07-01", end: "2024-07-05" },
          //   { id: "c2", title: "event 2", start: "2024-07-02T12:00:00", end: "2024-07-02T16:00:00" },
          // ]
        }
      />
    </div>
  );
}