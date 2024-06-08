import { useCallback } from "react";

const isEmail = (email) => {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
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

const useHandleChangeDetail = (setFormData, setError) =>
  useCallback(
    (e) => {
      const value = e.target.value;
      const key = e.target.id;
      if (!value) {
        errorSetter(setError, key, "This field cannot be blank");
      } else if (key === "email" && !isEmail(value)) {
        errorSetter(setError, key, "Invalid Email");
      } else if (
        key === "phoneNum" &&
        (!isPhoneNum(value) || value.length < 8)
      ) {
        errorSetter(setError, key, "Invalid Phone Number");
      } else {
        errorSetter(setError, key, "");

        setFormData((prev) => ({
          ...prev,
          [key]: value,
        }));
      }
    },
    [setFormData, setError],
  );

const useHandleChangeDate = (setFormData) =>
  useCallback(
    (e) => {
      const dateString = new Date(e).toLocaleDateString();
      setFormData((prev) => ({
        ...prev,
        startDate: dateString,
      }));
    },
    [setFormData],
  );

const useHandleStartTime = (setFormData, formData) =>
  useCallback(
    (e) => {
      console.log(e);
      const timeString = new Date(e).toLocaleTimeString([], {
        timeStyle: "short",
      });
      setFormData((prev) => ({
        ...prev,
        startTime: timeString,
      }));
      if (formData?.endTime !== undefined) {
        setFormData((prev) => ({
          ...prev,
          endTime: "",
        }));
      }
    },
    [setFormData, formData],
  );

const useHandleEndTime = (setFormData) =>
  useCallback(
    (e) => {
      const timeString = new Date(e).toLocaleTimeString([], {
        timeStyle: "short",
      });
      setFormData((prev) => ({
        ...prev,
        endTime: timeString,
      }));
    },
    [setFormData],
  );

const useHandleCapacity = (setFormData) =>
  useCallback(
    (e) => {
      const key = e.target.id;
      const value = e.target.value;
      if (value >= 5 && value <= 500) {
        setFormData((prev) => ({
          ...prev,
          [key]: value,
        }));
      }
    },
    [setFormData],
  );

export {
  useHandleChangeDetail,
  useHandleStartTime,
  useHandleEndTime,
  useHandleChangeDate,
  useHandleCapacity,
};
