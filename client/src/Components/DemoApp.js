import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function Calendar() {
  return (
    <div className="calendar-manager">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: "today, prev, next", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "dayGridMonth timeGridWeek timeGridDay", // will normally be on the right. if RTL, will be on the left
        }}
        events={[
          { title: "event 1", start: "2024-07-01", end: "2024-07-05" },
          { title: "event 2", date: "2024-07-02" },
        ]}
      />
      ;
    </div>
  );
}
