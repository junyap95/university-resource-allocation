export const START_TIME_GREEDY = "START_TIME_GREEDY";
export const LONGEST_DURATION_GREEDY = "LONGEST_DURATION_GREEDY";
export const RANDOM_ASSIGNMENT = "RANDOM_ASSIGNMENT";
export const DYNAMIC_PROGRAMMING = "DYNAMIC_PROGRAMMING";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.yourproductiondomain.com"
    : "http://localhost:3001";
