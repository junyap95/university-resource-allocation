import './App.css';
import DisplayTable from "./Components/DisplayTable";
import Home from "./Components/Home";
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="users" element={<DisplayTable/>}></Route>
        </Routes>
    );
}

export default App;
