function DynamicTable({ dataFromSQL }) {
  const headers = Object.keys(dataFromSQL[0]);
  // console.log(dataFromSQL, "rows");

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
            {dataFromSQL.map((row) => {
              const fields = Object.values(row);
              return (
                <tr>
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
