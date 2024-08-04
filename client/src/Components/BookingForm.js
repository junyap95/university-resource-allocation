import "react-datepicker/dist/react-datepicker.css";
import { useState, forwardRef } from "react";
import FormInputBox from "./FormInputBox";
import StartDateView from "../Views/StartDateView";
import TimeView from "../Views/TimeView";
import CapacityView from "../Views/CapacityView";
import FormSubmitMessage from "./FormSubmitMessage";
import BookingConfirmationForm from "./BookingConfirmationForm";
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
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingMessage, setBookingMessage] = useState({});

  const handleChangeDetail = useHandleChangeDetail(setFormData, setError);
  const handleChangeDate = useHandleChangeDate(setFormData);
  const handleStartTime = useHandleStartTime(setFormData, formData);
  const handleEndTime = useHandleEndTime(setFormData);
  const handleCapacity = useHandleCapacity(setFormData);

  const handleConfirm = async (e) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:3001/insert-client-and-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setBookingMessage(data);
        setIsSubmitted(true);
      }
    } catch (error) {
      // Handle errors gracefully, e.g., by setting an error message state
      console.error("Submission error:", error);
      setBookingMessage({
        message: "Failed to submit booking. Please try again later.",
      });
    }
  };

  const handleGoBack = () => {
    setIsConfirmed(false);
  };

  const handleMakeNew = () => {
    setIsSubmitted(false);
    setIsConfirmed(false);
    setFormData({
      firstName: "",
      lastName: "",
      phoneNum: "",
      email: "",
      capacity: 5,
      startDate: "",
      startTime: "",
      endTime: "",
    });
  };

  return !isSubmitted ? (
    <div className="main-container" ref={ref}>
      {!isConfirmed ? (
        <form onSubmit={handleConfirm} className="sub-container">
          <FormInputBox
            title="First Name"
            type="text"
            id="firstName"
            value={formData.firstName}
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
            value={formData?.lastName}
          />

          <FormInputBox
            title="Phone Number"
            type="text"
            id="phoneNum"
            placeholder="ex. 07711448788"
            onChange={handleChangeDetail}
            error={error.phoneNum}
            value={formData?.phoneNum}
          />

          <FormInputBox
            title="Email Address"
            type="email"
            id="email"
            placeholder="ex. john.smith@gmail.com"
            onChange={handleChangeDetail}
            error={error.email}
            value={formData?.email}
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
            <button className="btn main-btn" type="submit">
              Submit Booking
            </button>
          </div>
        </form>
      ) : (
        <BookingConfirmationForm
          formData={formData}
          onConfirm={handleSubmit}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  ) : (
    <FormSubmitMessage onGoBack={handleMakeNew} messages={bookingMessage} />
  );
});

export default BookingForm;
