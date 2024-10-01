import { isHallAvailable } from "./algorithms.js";
import { calculateSingleProfit, calculateTotalProfit } from "../utilities/allocationCalculator.js";

export const allocateRecursive = (index, allocatedRequests, bookings, halls) => {
  // Base case: if all bookings have been processed
  if (index >= bookings.length) {
    const totalProfit = calculateTotalProfit(allocatedRequests);
    const failedRequests = bookings.filter(
      (request) => !allocatedRequests.some((alloc) => alloc.request_id === request.request_id)
    );
    return {
      allocatedRequests,
      totalProfit,
      failedRequests,
    };
  }

  const request = bookings[index];
  const availableHalls = [];

  // Identify available halls for the current request
  for (const hall of halls) {
    if (hall.capacity >= request.capacity && isHallAvailable(allocatedRequests, hall, request)) {
      availableHalls.push(hall);
    }
  }

  // Case 1: Skip the current request and move to the next
  const skippedResult = allocateRecursive(index + 1, allocatedRequests, bookings, halls);
  let bestAllocation = skippedResult.allocatedRequests;
  let bestProfit = skippedResult.totalProfit;
  let bestUnallocated = skippedResult.failedRequests;

  // Case 2: Try allocating the current request to each available hall
  for (const hall of availableHalls) {
    const allocatedRes = {
      ...request,
      hall_assigned: hall.id,
      space_utilised: `${request.capacity}/${hall.capacity}`,
      profit: calculateSingleProfit(request),
    };

    // Instead of using [...allocatedRequests], we mutate the array in place and revert after the recursive call
    allocatedRequests.push(allocatedRes); // Add the current allocation to the list

    const result = allocateRecursive(index + 1, allocatedRequests, bookings, halls);

    // Check if this allocation yields a better profit
    if (result.totalProfit > bestProfit) {
      bestProfit = result.totalProfit;
      bestAllocation = result.allocatedRequests.slice(); // Make a copy of the best allocation
      bestUnallocated = result.failedRequests;
    }

    // Revert the allocation (backtrack) to explore other allocations
    allocatedRequests.pop();
  }

  // Return the best result
  return {
    allocatedRequests: bestAllocation,
    failedRequests: bestUnallocated,
    totalProfit: bestProfit,
  };
};
