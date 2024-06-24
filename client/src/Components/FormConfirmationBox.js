import React from "react";

const FormConfirmationBox = ({ title, formData }) => {
  return (
    <div className="confirm-box">
      <strong>{title}:</strong>
      <div>{formData}</div>
    </div>
  );
};

export default FormConfirmationBox;
