import { isHallAvailable } from "./algorithms.js";
import {
  calculateSingleProfit,
  calculateTotalProfit,
  calculateTotalProfitByRatio,
} from "../utilities/allocationCalculator.js";

// /**
//  * assignedRequets structure
//  * is an array
//  * {
//  *  request_id,
//  *  start_time,
//  *  end_time,
//  *  date,
//  *  hall_assigned: string,
//  *  space_utilised: string,
//  *  profit: number
//  * }[]
//  */

// export const allocateRecursive = (index, allocatedRequests, bookings, halls) => {
//   if (index >= bookings.length) {
//     const totalProfit = calculateTotalProfit(allocatedRequests);
//     const failedRequests = bookings.filter(
//       (request) => !allocatedRequests.some((alloc) => alloc.request_id === request.request_id)
//     );
//     return {
//       allocatedRequests,
//       totalProfit: totalProfit,
//       failedRequests,
//     };
//   }

//   const availableHalls = [];

//   const request = bookings[index];

//   //TODO, CHECK OBJECT KEY, HALL SIZE VS CAPACITY? refer to executeAlgorithms
//   for (const hall of halls) {
//     if (hall.capacity >= request.capacity && isHallAvailable(allocatedRequests, hall, request)) {
//       availableHalls.push(hall);
//     }
//   }

//   const skippedRequest = allocateRecursive(index + 1, [...allocatedRequests], bookings, halls);
//   let maxProfit = skippedRequest.totalProfit;
//   let bestAllocation = skippedRequest.allocatedRequests;
//   let bestUnallocated = skippedRequest.failedRequests;

//   for (const hall of availableHalls) {
//     const allocatedRes = {
//       ...request,
//       hall_assigned: hall.id,
//       space_utilised: `${request.capacity}/${hall.capacity}`,
//       profit: calculateSingleProfit(request),
//     };
//     const updatedAlloc = [...allocatedRequests, allocatedRes];
//     const result = allocateRecursive(index + 1, updatedAlloc, bookings, halls);
//     if (result.totalProfit > maxProfit) {
//       maxProfit = result.totalProfit;
//       bestAllocation = result.allocatedRequests;
//       bestUnallocated = result.failedRequests;
//     }
//   }

//   return {
//     allocatedRequests: bestAllocation,
//     failedRequests: bestUnallocated,
//     totalProfit: maxProfit,
//   };
// };

// Memoization storage
const memo = new Map();

const generateKey = (index, allocatedRequests) => {
  // Generate a unique key based on the current state (index and allocated requests)
  const allocatedKey = allocatedRequests
    .map((req) => `${req.request_id}:${req.hall_assigned}`)
    .join("|");
  return `${index}-${allocatedKey}`;
};

export const allocateRecursiveWithSpaceUtil = (index, allocatedRequests, bookingMap, hallMap) => {
  if (index === 0) {
    memo.clear();
  }
  const key = generateKey(index, allocatedRequests);
  if (memo.has(key)) {
    // Return memoized result if available
    return memo.get(key);
  }

  if (index >= bookingMap.length) {
    const totalProfit = calculateTotalProfitByRatio(allocatedRequests);
    const failedRequests = bookingMap.filter(
      (request) => !allocatedRequests.some((alloc) => alloc.request_id === request.request_id)
    );
    return { allocatedRequests, totalProfit, failedRequests };
  }

  const availableHalls = [];
  const request = bookingMap[index];

  // Check for available halls
  for (const hall of hallMap) {
    if (hall.capacity >= request.capacity && isHallAvailable(allocatedRequests, hall, request)) {
      availableHalls.push(hall);
    }
  }

  const skippedRequest = allocateRecursive(index + 1, [...allocatedRequests], bookingMap, hallMap);
  let maxProfit = skippedRequest.totalProfit;
  let bestAllocation = skippedRequest.allocatedRequests;
  let bestUnallocated = skippedRequest.failedRequests;

  // Try allocating the current booking to each available hall
  for (const hall of availableHalls) {
    const allocatedRes = {
      ...request,
      hall_assigned: hall.id,
      space_utilised: `${request.capacity}/${hall.capacity}`,
      profit: calculateSingleProfit(request),
      profitByRatio: (request.capacity / hall.capacity) * calculateSingleProfit(request),
    };
    const updatedAlloc = [...allocatedRequests, allocatedRes];
    const result = allocateRecursive(index + 1, updatedAlloc, bookingMap, hallMap);

    if (result.totalProfit > maxProfit) {
      maxProfit = result.totalProfit;
      bestAllocation = result.allocatedRequests;
      bestUnallocated = result.failedRequests;
    }
  }

  const result = {
    allocatedRequests: bestAllocation,
    totalProfit: maxProfit,
    failedRequests: bestUnallocated,
  };
  memo.set(key, result); // Memoize the result for the current state

  return result;
};

export const allocateRecursive = (index, allocatedRequests, bookingMap, hallMap) => {
  if (index === 0) {
    memo.clear();
  }
  const key = generateKey(index, allocatedRequests);
  if (memo.has(key)) {
    // Return memoized result if available
    return memo.get(key);
  }

  if (index >= bookingMap.length) {
    const totalProfit = calculateTotalProfit(allocatedRequests);
    const failedRequests = bookingMap.filter(
      (request) => !allocatedRequests.some((alloc) => alloc.request_id === request.request_id)
    );
    return { allocatedRequests, totalProfit, failedRequests };
  }

  const availableHalls = [];
  const request = bookingMap[index];

  // Check for available halls
  for (const hall of hallMap) {
    if (hall.capacity >= request.capacity && isHallAvailable(allocatedRequests, hall, request)) {
      availableHalls.push(hall);
    }
  }

  const skippedRequest = allocateRecursive(index + 1, [...allocatedRequests], bookingMap, hallMap);
  let maxProfit = skippedRequest.totalProfit;
  let bestAllocation = skippedRequest.allocatedRequests;
  let bestUnallocated = skippedRequest.failedRequests;

  // Try allocating the current booking to each available hall
  for (const hall of availableHalls) {
    const allocatedRes = {
      ...request,
      hall_assigned: hall.id,
      space_utilised: `${request.capacity}/${hall.capacity}`,
      profit: calculateSingleProfit(request),
    };
    const updatedAlloc = [...allocatedRequests, allocatedRes];
    const result = allocateRecursive(index + 1, updatedAlloc, bookingMap, hallMap);
    if (result.totalProfit > maxProfit) {
      maxProfit = result.totalProfit;
      bestAllocation = result.allocatedRequests;
      bestUnallocated = result.failedRequests;
    }
  }

  const result = {
    allocatedRequests: bestAllocation,
    totalProfit: maxProfit,
    failedRequests: bestUnallocated,
  };
  memo.set(key, result); // Memoize the result for the current state

  return result;
};
