import { nanoid } from "nanoid";

export const timeStringToSeconds = (timeStr) => {
  const [hours, minutes, seconds] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + (seconds || 0);
};

export const timeStringToHoursAndMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 100 + minutes;
};

export const convertDateToSQLFormat = (dateString) => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

export const generateClientID = (firstName, lastName) => {
  return firstName[0].toUpperCase() + lastName[0].toUpperCase() + "_" + nanoid(8);
};
