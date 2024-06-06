import "react-datepicker/dist/react-datepicker.css";
import { useState, forwardRef, useCallback } from "react";
import FormInputBox from "./FormInputBox";
import StartDateView from "../Views/StartDateView";
import TimeView from "../Views/TimeView";
import CapacityView from "../Views/CapacityView";
import FormSubmitMessage from "./FormSubmitMessage";
import {
  useHandleStartTime,
  useHandleChangeName,
  useHandleCapacity,
  useHandleEndTime,
  useHandleChangeDate,
} from "../helpers/formHelper";

const BookingForm = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNum: "",
    capacity: 5,
    startDate: "",
    startTime: "",
    endTime: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChangeName = useHandleChangeName(setFormData);
  const handleChangeDate = useHandleChangeDate(setFormData);
  const handleStartTime = useHandleStartTime(setFormData, formData);
  const handleEndTime = useHandleEndTime(setFormData);
  const handleCapacity = useHandleCapacity(setFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(formData);
    // const response = await fetch("/time-greedy", {
    //   method: "POST",
    //   body: JSON.stringify(formData),
    // });
    // const data = response.json();
    // console.log(data);
    setIsSubmitted(true);
  };

  const handleGoBack = () => {
    setIsSubmitted(false);
    setFormData({
      firstName: "",
      lastName: "",
      capacity: 5,
      startDate: "",
      startTime: "",
      endTime: "",
      addRequirement: "",
    });
  };

  // const isInvalidEndData = startTime >= endTime;

  return !isSubmitted ? (
    <div className="main-container" ref={ref}>
      <form onSubmit={handleSubmit} className="sub-container">
        <FormInputBox
          title="First Name"
          id="firstName"
          placeholder="ex. John"
          onChange={handleChangeName}
        />

        <FormInputBox
          title="Last Name"
          id="lastName"
          placeholder="ex. Smith"
          onChange={handleChangeName}
        />

        <FormInputBox
          title="Phone Number"
          id="phoneNum"
          placeholder="ex. 07711448788"
          onChange={handleChangeName}
        />

        <StartDateView
          id="eventDate"
          onChange={handleChangeDate}
          selected={formData?.startDate}
        />

        <TimeView
          onChangeStart={handleStartTime}
          onChangeEnd={handleEndTime}
          startTime={formData?.startTime}
          endTime={formData?.endTime}
        />

        <CapacityView
          handleCapacity={handleCapacity}
          capacity={formData?.capacity}
        />

        <div>
          <button className="search-button" type="submit">
            Submit Booking
          </button>
        </div>
      </form>
    </div>
  ) : (
    <FormSubmitMessage onGoBack={handleGoBack} />
  );
});

export default BookingForm;
