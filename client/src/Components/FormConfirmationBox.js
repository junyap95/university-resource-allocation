import React from "react";

const FormConfirmationBox = ({ title, formData }) => {
  return (
    <p className="confirm-box">
      <strong>{title}:</strong>
      <div>{formData}</div>
    </p>
  );
};

export default FormConfirmationBox;
