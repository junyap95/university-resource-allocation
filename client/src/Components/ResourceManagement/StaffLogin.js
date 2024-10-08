// @ts-nocheck
import { useCallback } from "react";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import BBKbutton from "../BBKbutton";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import FormInputBox from "Components/Booking/FormInputBox";

/**
 * NOTE!! This component is only a placeholder
 * and is not fully developed
 * needs authentication, session storage and state
 */
export default function StaffLogin() {
  const navigate = useNavigate();
  const handleLogin = useCallback((e) => navigate("/view-tables"), [navigate]);

  return (
    <>
      <NavigationBar color="nav-bar-red" />
      <div
        className="main-container"
        style={{ flexDirection: "column", minHeight: "60vh", alignItems: "center" }}
      >
        <div className="confirm-container">
          <h3 style={{ color: "#72243c" }}>BBK STAFF LOGIN</h3>

          <FormInputBox
            title="Enter Your Staff Email"
            placeholder="ex. johnsmith@gmail.com"
            type="text"
          />
          <FormInputBox
            title="Enter Your Password"
            placeholder="Enter Your Password Here"
            type="password"
          />
          <BBKbutton btnClass={"green-btn"} btnText={"LOG IN"} handlerFn={handleLogin} />
        </div>
        <>
          <Alert style={{ margin: "1rem" }} severity="warning">
            NOTE!! This component is disabled for demo purpose, just press LOG IN
          </Alert>
        </>
      </div>
      <Footer />
    </>
  );
}
