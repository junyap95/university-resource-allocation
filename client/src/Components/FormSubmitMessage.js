import React from "react";

const SubmissionMessage = ({ onGoBack }) => {
  return (
    <div className="main-container">
      <h2>Booking Submitted Successfully!</h2>
      <button className="search-button" onClick={onGoBack}>
        Go Back Home
      </button>
    </div>
  );
};

export default SubmissionMessage;
