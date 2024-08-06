import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import DisplayCalendar from "./Components/DisplayCalendar";
import AllTables from "./Components/AllTables";
import CheckBookingStatus from "./Components/CheckBookingStatus";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/check-booking" element={<CheckBookingStatus />}></Route>
      <Route path="/view-schedule" element={<DisplayCalendar />}></Route>
      <Route path="/view-all-bookings" element={<AllTables />}></Route>
    </Routes>
  );
}

export default App;
