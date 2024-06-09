import "react-datepicker/dist/react-datepicker.css";
import { useState, forwardRef, useCallback } from "react";
import FormInputBox from "./FormInputBox";
import StartDateView from "../Views/StartDateView";
import TimeView from "../Views/TimeView";
import CapacityView from "../Views/CapacityView";
import FormSubmitMessage from "./FormSubmitMessage";
import {
  useHandleStartTime,
  useHandleChangeDetail,
  useHandleCapacity,
  useHandleEndTime,
  useHandleChangeDate,
} from "../helpers/formHelper";

const BookingForm = forwardRef((props, ref) => {
  // data acquired from user input
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNum: "",
    email: "",
    capacity: 5,
    startDate: "",
    startTime: "",
    endTime: "",
  });
  // error state - to dynamically display validation error on UI
  const [error, setError] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChangeDetail = useHandleChangeDetail(setFormData, setError);
  const handleChangeDate = useHandleChangeDate(setFormData);
  const handleStartTime = useHandleStartTime(setFormData, formData);
  const handleEndTime = useHandleEndTime(setFormData);
  const handleCapacity = useHandleCapacity(setFormData);

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    console.log("formdata", formData);

    const response = await fetch("http://localhost:3001/booking-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
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
    });
  };

  return !isSubmitted ? (
    <div className="main-container" ref={ref}>
      <form onSubmit={handleSubmit} className="sub-container">
        <FormInputBox
          title="First Name"
          type="text"
          id="firstName"
          placeholder="ex. John"
          onChange={handleChangeDetail}
          error={error.firstName}
        />

        <FormInputBox
          title="Last Name"
          type="text"
          id="lastName"
          placeholder="ex. Smith"
          onChange={handleChangeDetail}
          error={error.lastName}
        />

        <FormInputBox
          title="Phone Number"
          type="text"
          id="phoneNum"
          placeholder="ex. 07711448788"
          onChange={handleChangeDetail}
          error={error.phoneNum}
        />

        <FormInputBox
          title="Email Address"
          type="email"
          id="email"
          placeholder="ex. john.smith@gmail.com"
          onChange={handleChangeDetail}
          error={error.email}
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
