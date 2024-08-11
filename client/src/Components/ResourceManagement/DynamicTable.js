function DynamicTable({ data, highlightedDate }) {
  const headers = Object.keys(data[0]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const fields = Object.values(row);
            const isHighlighted = row.start_date === highlightedDate;
            return (
              <tr
                key={rowIndex}
                style={{
                  backgroundColor: isHighlighted ? "rgba(36, 114, 90, 0.3)" : "transparent",
                }}
              >
                {fields.map((value, index) => {
                  const header = headers[index];
                  if (header === "start_date") {
                    const date = new Date(value).toLocaleDateString();
                    return <td key={index}>{date}</td>;
                  }
                  return <td key={index}>{value}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DynamicTable;
