import { useEffect, useState } from "react";

const fetchData = async () => {
  // const delay = 750;
  try {
    // await new Promise((resolve) => setTimeout(resolve, delay));
    const response = await fetch("http://localhost:3001/users");
    return await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

function DisplayTable() {
  const [clientData, setClientData] = useState([{}]);

  useEffect(() => {
    console.log("useEffect initialised");
    fetchData().then((data) => {
      console.log(" in", data);
      setClientData(data);
    });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Client ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Contact Number</th>
          <th>Email Address</th>
        </tr>
      </thead>
      <tbody>
        {clientData?.map((client) => (
          <tr key={client.client_id}>
            <td>{client.client_id}</td>
            <td>{client.first_name}</td>
            <td>{client.last_name}</td>
            <td>{client.contact_num}</td>
            <td>{client.email_address}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DisplayTable;
