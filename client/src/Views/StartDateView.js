import { useState } from "react";
import DatePicker from "react-datepicker";

const StartDateView = () => {
  const [startDate, setStartDate] = useState();
  return (
    <>
      <div className="form-title">Select a Date*</div>
      <DatePicker
        showIcon
        toggleCalendarOnIconClick
        className="input-box"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="MM/dd/yyyy"
        minDate={new Date()}
        placeholderText="Click to select a date"
      />
    </>
  );
};

export default StartDateView;
