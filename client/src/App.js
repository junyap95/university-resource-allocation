import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import DisplayCalendar from "./Components/DisplayCalendar";
import CheckBookingStatus from "./Components/Booking/CheckBookingStatus";
import { ResourceManagement } from "./Components/ResourceManagement/ResourceManagement";
import StaffLogin from "Components/ResourceManagement/StaffLogin";
import AdminDashboard from "Components/ResourceManagement/AdminDashboard";
import TestCal from "Components/TestCal";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/check-booking" element={<CheckBookingStatus />}></Route>
      <Route path="/view-schedule" element={<DisplayCalendar />}></Route>
      <Route path="/view-tables" element={<ResourceManagement />}></Route>
      <Route path="/staff-login" element={<StaffLogin />}></Route>
      <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
      <Route path="/test-cal" element={<TestCal />}></Route>
    </Routes>
  );
}

export default App;
