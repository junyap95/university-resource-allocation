import DatePicker from "react-datepicker";

const StartDateView = ({ onChange, selected }) => {
  const today = new Date();
  // Calculate the month 3 months from now
  const futureMonth = today.getMonth() + 3;
  // Calculate the last day of the future month
  const lastDayOfFutureMonth = new Date(today.getFullYear(), futureMonth + 1, 0);
  return (
    <div className="form-container">
      <div className="form-title">Select a Date*</div>
      <DatePicker
        showIcon
        toggleCalendarOnIconClick
        id="startDate"
        className="input-box"
        value={selected}
        portalId="root-portal"
        onChange={onChange}
        dateFormat="MM/dd/yyyy"
        minDate={new Date()}
        maxDate={lastDayOfFutureMonth}
        placeholderText="Click to select a date"
        closeOnScroll={true}
        required={true}
      />
    </div>
  );
};

export default StartDateView;
