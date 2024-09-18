import { useCallback } from "react";

const isEmail = (email) => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
};

const isPhoneNum = (phoneNum) => {
  return /^\d+$/.test(phoneNum);
};

const errorSetter = (setError, key, message) => {
  setError((prev) => ({
    ...prev,
    [key]: message,
  }));
};

const formSetter = (setFormData, key, value) => {
  setFormData((prev) => ({
    ...prev,
    [key]: value,
  }));
};

const useHandleChangeDetail = (setFormData, setError) =>
  useCallback(
    (e) => {
      const value = e.target.value.trim();
      const key = e.target.id;

      // Update the form data state with the new value
      formSetter(setFormData, key, value);

      // Validate the input and set error messages
      if (!value) {
        errorSetter(setError, key, "This field cannot be blank");
      } else if (key === "email" && !isEmail(value)) {
        errorSetter(setError, key, "Invalid Email");
      } else if (key === "phoneNum" && (!isPhoneNum(value) || value.length < 8)) {
        errorSetter(setError, key, "Invalid Phone Number");
      } else {
        errorSetter(setError, key, "");
      }
    },
    [setFormData, setError]
  );

const useHandleChangeDate = (setFormData) =>
  useCallback(
    (e) => {
      const dateString = new Date(e).toLocaleDateString();
      formSetter(setFormData, "startDate", dateString);
    },
    [setFormData]
  );

const useHandleStartTime = (setFormData, formData) =>
  useCallback(
    (e) => {
      const timeString = new Date(e).toLocaleTimeString([], {
        timeStyle: "short",
      });
      formSetter(setFormData, "startTime", timeString);

      if (formData?.endTime !== undefined) {
        formSetter(setFormData, "endTime", "");
      }
    },
    [setFormData, formData]
  );

const useHandleEndTime = (setFormData) =>
  useCallback(
    (e) => {
      const timeString = new Date(e).toLocaleTimeString([], {
        timeStyle: "short",
      });
      formSetter(setFormData, "endTime", timeString);
    },
    [setFormData]
  );

const useHandleCapacity = (setFormData) =>
  useCallback(
    (e) => {
      const key = e.target.id;
      const value = e.target.value;
      if (value >= 5 && value <= 500) {
        formSetter(setFormData, key, value);
      }
    },
    [setFormData]
  );

export {
  useHandleChangeDetail,
  useHandleStartTime,
  useHandleEndTime,
  useHandleChangeDate,
  useHandleCapacity,
};
