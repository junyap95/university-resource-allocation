import Footer from "Components/Footer";
import NavigationBar from "Components/NavigationBar";
import { API_URL } from "helpers/client-constants";
import { useEffect, useState } from "react";

// Fetch function to get bookings from API
const fetchBookings = async () => {
  try {
    const response = await fetch(`${API_URL}/view-entry/all-bookings`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data from DB, check if DB is online: ", error);
    return []; // Return an empty array in case of error
  }
};

// AdminDashboard component
export default function AdminDashboard() {
  const [totalBookings, setTotalBookings] = useState({
    approved: 0,
    failed: 0,
    pending: 0,
  });
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    // Fetch data and update state
    const loadData = async () => {
      const data = await fetchBookings();
      setAllBookings(data);

      // Calculate totals after setting allBookings
      const approvedCount = data.filter(
        (b) => b.booking_status.toUpperCase() === "APPROVED"
      ).length;
      const failedCount = data.filter((b) => b.booking_status.toUpperCase() === "FAILED").length;
      const pendingCount = allBookings.length - Number(approvedCount + failedCount);

      setTotalBookings({
        approved: approvedCount,
        failed: failedCount,
        pending: pendingCount,
      });
    };

    loadData();
  });

  return (
    <>
      <NavigationBar color="nav-bar-red" />
      <div>
        <h2>Total Bookings</h2>
        <div>Total Bookings: {allBookings.length}</div>
        <div>
          <div>Approved: {totalBookings.approved}</div>
          <div>Failed: {totalBookings.failed}</div>
          <div>Pending: {totalBookings.pending}</div>
        </div>
      </div>
      <Footer />
    </>
  );
}
