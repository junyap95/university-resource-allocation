import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";

export default function IndividualCalendarView({ clientRequest }) {
  return (
    <>
      <FullCalendar
        showNonCurrentDates={false}
        height={"65vh"}
        plugins={[dayGridPlugin, listPlugin, timeGridPlugin]}
        initialView="listYear"
        events={clientRequest.map((event, index) => ({
          ...event,
          backgroundColor: event.booking_status === "APPROVED" ? "green" : "red",
        }))}
        displayEventEnd={true}
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          meridiem: "short",
        }}
        dayMaxEventRows={true}
        headerToolbar={{
          left: "prev next today",
          center: "title",
          right: "listYear dayGridMonth",
        }}
        views={{
          listWeek: { buttonText: "list week" },
          listMonth: { buttonText: "list month" },
          listYear: { buttonText: "Year" },
          dayGridMonth: { buttonText: "Month" },
        }}
      ></FullCalendar>
    </>
  );
}
