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

export const renderTableRows = (data, headers, highlighted) => {
  return data.map((row, rowIndex) => {
    const isHighlighted = row.start_date === highlighted || row.hall_id === highlighted;
    return (
      <tr
        key={rowIndex}
        style={{
          backgroundColor: isHighlighted ? "rgba(114, 36, 60, 0.3)" : "transparent",
        }}
      >
        {Object.values(row).map((value, index) => (
          <td key={index}>
            {headers[index] === "start_date" ? new Date(value).toLocaleDateString() : value}
          </td>
        ))}
      </tr>
    );
  });
};
