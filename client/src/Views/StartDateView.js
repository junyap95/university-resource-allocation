import { useState } from "react";
import DatePicker from "react-datepicker";

const StartDateView = ({ onChange, selected }) => {
  return (
    <>
      <div className="form-title">Select a Date*</div>
      <DatePicker
        showIcon
        toggleCalendarOnIconClick
        id="startDate"
        className="input-box"
        value={selected}
        // selected={selected}
        portalId="root-portal"
        onChange={onChange}
        dateFormat="MM/dd/yyyy"
        minDate={new Date()}
        placeholderText="Click to select a date"
      />
    </>
  );
};

export default StartDateView;
