import { timeStringToSeconds } from "./utils.js";

// simplified profit calculation: 1 hour of booking generates £100
export const calculateTotalProfit = (data) => {
  let totalProfit = 0;

  data.forEach((result) => {
    const startTimeInSeconds = timeStringToSeconds(result.start_time);
    const endTimeInSeconds = timeStringToSeconds(result.end_time);
    const durationInSeconds = endTimeInSeconds - startTimeInSeconds;
    const durationInHours = durationInSeconds / 3600; // Convert seconds to hours
    const profit = durationInHours * 100; // £100 per hour

    totalProfit += profit;
  });

  return totalProfit;
};

export const calculateSingleProfit = (data) => {
  let totalProfit = 0;

  const startTimeInSeconds = timeStringToSeconds(data.start_time);
  const endTimeInSeconds = timeStringToSeconds(data.end_time);
  const durationInSeconds = endTimeInSeconds - startTimeInSeconds;
  const durationInHours = durationInSeconds / 3600; // Convert seconds to hours
  const profit = durationInHours * 100; // £100 per hour
  totalProfit += profit;

  return totalProfit;
};
