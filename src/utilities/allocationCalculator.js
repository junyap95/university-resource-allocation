import { timeStringToSeconds } from "./utils.js";

// simplified profit calculation: 1 hour of booking generates £100
export const calculateTotalProfit = (data) => {
  let totalProfit = 0;

  data.forEach((result) => {
    totalProfit += result.profit;
  });

  return totalProfit;
};

export const calculateTotalProfitByRatio = (data) => {
  let totalProfit = 0;

  data.forEach((result) => {
    totalProfit += result.profitByRatio;
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
export const calculateTotalOccupancyRatio = (data) => {
  let ratio = 0;
  data.forEach((d) => {
    ratio += d.occupancyRatio;
  });
  return ratio;
};
