import "./App.css";
import ClientTable from "./Components/ClientTable";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="users" element={<ClientTable />}></Route>
    </Routes>
  );
}

export default App;
