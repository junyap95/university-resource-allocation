import React from "react";

const FormConfirmationBox = ({ title, formData }) => {
  return (
    <>
      <p data-testid={`form-confirmation-${title}`}><strong style={{ color: '#72243c' }}>{title}: </strong>{formData}</p>
      {/* <div>{formData}</div> */}
    </>
  );
};

export default FormConfirmationBox;
