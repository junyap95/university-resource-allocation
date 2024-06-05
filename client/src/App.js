import "./App.css";
import DisplayTable from "./Components/DisplayTable";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="users" element={<DisplayTable />}></Route>
    </Routes>
  );
}

export default App;
