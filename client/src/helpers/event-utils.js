let eventGuid = 0;
let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  {
    id: "FAKE ID 1",
    title: "All-day event",
    start: "2024-08-16",
  },
  {
    id: "FAKE ID 2",
    title: "Timed event",
    start: todayStr + "T12:00:00",
    end: todayStr + "T16:00:00",
  },
];

export function createEventId() {
  return String(eventGuid++);
}
