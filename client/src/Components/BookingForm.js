import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, forwardRef } from "react";
import FormInputBox from "./FormInputBox";
import StartDateView from "../Views/StartDateView";
import TimeView from "../Views/TimeView";
import CapacityView from "../Views/CapacityView";

const BookingForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    capacity: 0,
    eventDate: "",
    startTime: "",
    endTime: "",
    addRequirement: "",
  });

  // const isInvalidEndData = startTime >= endTime;

  return (
    <div className="main-container" ref={ref}>
      <div className="sub-container">
        <FormInputBox
          title="First Name"
          id="user-fname-input"
          placeholder="ex. John"
        />

        <FormInputBox
          title="Last Name"
          id="user-lname-input"
          placeholder="ex. Smith"
        />

        <StartDateView />

        <TimeView />

        <CapacityView />

        {/*<div>{isInvalidEndData && <span>Invalid</span>}</div>*/}

        {/*<div>*/}
        {/*  <form>*/}
        {/*    <div>Additional Requirement:</div>*/}
        {/*    <select className="input-box" name="cars" id="cars">*/}
        {/*      <option value="desktops">Desktop/Computers</option>*/}
        {/*      <option value="saab">Catering services</option>*/}
        {/*      <option value="opel">Other</option>*/}
        {/*    </select>*/}
        {/*  </form>*/}
        {/*</div>*/}

        <div>
          <button className="search-button" type="button">
            Submit Booking
          </button>
        </div>
      </div>
    </div>
  );
});

export default BookingForm;
