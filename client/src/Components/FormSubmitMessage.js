import cross from "../images/icons8-cross.svg";
import tick from "../images/icons8-tick.svg";

const FormSubmitMessage = ({ onGoBack, messages }) => {
  return (
    <div className="main-container">
      <div className="sub-container">
        <div>
          <h2>{messages.message}</h2>
        </div>
        {messages.operation ? (
          <>
            <img src={tick} alt="Your Icon" width="50" height="50" />
            <strong>
              Use this Booking ID to check the status of your booking:
            </strong>
            <div>{messages.requestID}</div>
          </>
        ) : (
          <>
            <img src={cross} alt="Your Icon" width="50" height="50" />
          </>
        )}
        <button className="search-button" onClick={onGoBack}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default FormSubmitMessage;
