import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import ResourceManagement from "./Components/ResourceManagement";
import AllTables from "./Components/AllTables";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/view-schedule" element={<ResourceManagement />}></Route>
      <Route path="/view-all-bookings" element={<AllTables />}></Route>
    </Routes>
  );
}

export default App;
