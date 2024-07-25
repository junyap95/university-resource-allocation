import DatePicker from "react-datepicker";

const StartDateView = ({ onChange, selected }) => {
  console.log("selected", selected);
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
        placeholderText="Click to select a date"
      />
    </div>
  );
};

export default StartDateView;
