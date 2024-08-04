import cross from "../images/icons8-cross.svg";
import tick from "../images/icons8-tick.svg";

const FormSubmitMessage = ({ onGoBack, messages }) => {
  return (
    <div className="main-container">
      <div className="sub-container">
        <h2>{messages.clientMsg}</h2>
        {messages.operation ? (
          <>
            <img src={tick} alt="Your Icon" width="75rem" height="75rem" />
            <h3 style={{ marginBottom: "0" }}>{messages.message}</h3>
            <h3
              style={{
                fontWeight: "normal",
                textAlign: "center",
                marginBottom: "0",
              }}
            >
              Use this Booking ID to check <br />
              the status of your booking:
            </h3>
            <h2>{messages.requestID}</h2>
          </>
        ) : (
          <>
            <img src={cross} alt="Your Icon" width="50" height="50" />
          </>
        )}
        <button className="btn main-btn" onClick={onGoBack}>
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default FormSubmitMessage;
