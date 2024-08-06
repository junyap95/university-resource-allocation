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
        events={eventsArray}
      />
    </div>
  );
}
