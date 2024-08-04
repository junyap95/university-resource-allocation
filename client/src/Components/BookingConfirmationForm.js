import FormConfirmationBox from "./FormConfirmationBox";

const BookingConfirmationForm = ({ formData, onConfirm, onGoBack }) => {
  return (
    <div className="main-container">
      <div className="confirm-container">
        <div>
          <h2 style={{ color: '#72243c' }}>Review Your Booking</h2>
          <FormConfirmationBox
            formData={formData?.firstName}
            title={"First Name"}
          />
          <FormConfirmationBox
            title={"Last Name"}
            formData={formData?.lastName}
          />
          <FormConfirmationBox
            title={"Phone Number"}
            formData={formData?.phoneNum}
          />
          <FormConfirmationBox
            title={"Email Address"}
            formData={formData?.email}
          />
          <FormConfirmationBox title={"Date"} formData={formData?.startDate} />
          <FormConfirmationBox
            title={"Start Time"}
            formData={formData?.startTime}
          />
          <FormConfirmationBox
            title={"End Time"}
            formData={formData?.endTime}
          />
          <FormConfirmationBox
            title={"Capacity"}
            formData={formData?.capacity}
          />
        </div>
        <>
          <button className="btn main-btn" onClick={onGoBack}>
            Edit
          </button>
          <button className="btn main-btn" onClick={onConfirm}>
            Confirm
          </button>
        </>
      </div>
    </div>
  );
};

export default BookingConfirmationForm;
