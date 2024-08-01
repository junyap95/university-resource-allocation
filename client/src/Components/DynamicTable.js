function DynamicTable({ data, highlightedDate }) {
  const headers = Object.keys(data[0]);

  return (
    <>
      <table>
        <thead>
          <tr>
            {headers.map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <>
            {data.map((row, rowIndex) => {
              const fields = Object.values(row);
              const isHighlighted = row.start_date === highlightedDate;
              return (
                <tr key={rowIndex} style={{ backgroundColor: isHighlighted ? 'yellow' : 'transparent' }}>
                  {fields.map((value, index) => {
                    const header = headers[index];
                    if (header === "start_date") {
                      const date = new Date(value).toLocaleDateString();
                      return <td>{date}</td>;
                    }
                    return <td>{value}</td>;
                  })}
                </tr>
              );
            })}
          </>
        </tbody>
      </table>
    </>
  );
}

export default DynamicTable;
