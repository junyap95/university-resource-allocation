import FullCalendarView from "./FullCalendarView";

export default function ResourceManagement() {
  // const [events, setEvents] = useState([]);
  const getEventsArray = async () => {
    try {
      const response = await fetch("http://localhost:3001/time-greedy", {
        method: "GET",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        // body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data, "data");
        // setEvents()
      }
    } catch (error) {
      console.error("Events allocation error:", error);
    }
  }

  getEventsArray();
  return (
    <>
      <FullCalendarView eventsArray={[]} />
    </>
  );
}
