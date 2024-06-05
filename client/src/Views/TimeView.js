import DatePicker from "react-datepicker";
import { useCallback, useState } from "react";

const TimeView = () => {
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();

  const handleStartTimeChange = useCallback(
    (time) => {
      setStartTime(time);
      if (endTime !== undefined) {
        setEndTime(undefined);
      }
    },
    [endTime],
  );

  return (
    <>
      <div className="form-title">Select Start Time*:</div>
      <DatePicker
        className="input-box"
        selected={startTime}
        onChange={handleStartTimeChange}
        showTimeSelect
        showTimeSelectOnly
        minTime={new Date().setHours(6)}
        maxTime={new Date().setHours(21)}
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
        placeholderText="Click to Select Start Time"
      />

      <div className="form-title">Select End Time*:</div>
      {/*  TODO : fix this*/}
      <DatePicker
        className={true ? "error-box" : "input-box"}
        disabled={!startTime}
        selected={endTime}
        onChange={(time) => setEndTime(time)}
        showTimeSelect
        showTimeSelectOnly
        minTime={startTime + 360000}
        maxTime={new Date().setHours(22)}
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
        placeholderText={
          startTime ? "Select End Time" : "Select Start Time First!"
        }
      />
    </>
  );
};

export default TimeView;
