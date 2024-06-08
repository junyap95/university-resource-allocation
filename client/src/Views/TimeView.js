import DatePicker from "react-datepicker";
import { useCallback, useState } from "react";
import { start } from "http-errors";

const TimeView = ({ onChangeStart, onChangeEnd, startTime, endTime }) => {
  // const [startTime, setStartTime] = useState();
  // const [endTime, setEndTime] = useState();
  const minStart = parseInt(startTime?.substring(0, 2));

  return (
    <div className="form-container">
      <div className="form-title">Select Start Time*:</div>
      <DatePicker
        className="input-box"
        value={startTime}
        onChange={onChangeStart}
        showTimeSelect
        showTimeSelectOnly
        portalId="root-portal"
        minTime={new Date().setHours(6)}
        maxTime={new Date().setHours(21)}
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm "
        placeholderText="Click to Select Start Time"
      />

      <div className="form-title">Select End Time*:</div>
      <DatePicker
        className={startTime ? "input-box" : "error-box"}
        disabled={!startTime}
        value={endTime}
        onChange={onChangeEnd}
        showTimeSelect
        showTimeSelectOnly
        portalId="root-portal"
        minTime={new Date().setHours(minStart)}
        maxTime={new Date().setHours(22)}
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm "
        placeholderText={
          startTime ? "Select End Time" : "Select Start Time First!"
        }
      />
    </div>
  );
};

export default TimeView;
