import { useCallback } from "react";

const useHandleChangeName = (setFormData) =>
  useCallback(
    (e) => {
      const value = e.target.value;
      const key = e.target.id;
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [setFormData],
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
  useHandleChangeName,
  useHandleStartTime,
  useHandleEndTime,
  useHandleChangeDate,
  useHandleCapacity,
};
