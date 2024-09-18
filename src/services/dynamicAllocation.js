import { isHallAvailable } from "./algorithms.js";
import { calculateSingleProfit, calculateTotalProfit } from "../utilities/allocationCalculator.js";
import { MOCK_REQUESTS } from "../utilities/constants.js";

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

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown(0);
    }
    return min;
  }

  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }

  bubbleUp(index) {
    const value = this.heap[index];
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[parentIndex] <= value) break;
      this.heap[index] = this.heap[parentIndex];
      index = parentIndex;
    }
    this.heap[index] = value;
  }

  bubbleDown(index) {
    const length = this.heap.length;
    const value = this.heap[index];
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (leftChild < length && this.heap[leftChild] < this.heap[smallest]) {
        smallest = leftChild;
      }

      if (rightChild < length && this.heap[rightChild] < this.heap[smallest]) {
        smallest = rightChild;
      }

      if (smallest === index) break;

      this.heap[index] = this.heap[smallest];
      index = smallest;
    }
    this.heap[index] = value;
  }
}

const calculateDuration = (startTime, endTime) => {
  const start = new Date(`1970-01-01T${startTime}`);
  const end = new Date(`1970-01-01T${endTime}`);
  return (end - start) / (1000 * 60); // Duration in minutes
};

const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(":").map(Number);
  return hours * 60 + minutes;
};

export const allocateHeuristic = (bookings, halls) => {
  bookings.forEach((booking) => {
    booking.capacity = parseInt(booking.capacity, 10);
    booking.duration = calculateDuration(booking.start_time, booking.end_time);
    booking.profit = calculateSingleProfit(booking);
    booking.start_time_minutes = timeToMinutes(booking.start_time);
    booking.score = booking.profit + booking.duration; // Or a weighted formula
  });

  bookings.sort((a, b) => b.score - a.score);
  halls.sort((a, b) => a.capacity - b.capacity);
  console.log("sorted bookings", JSON.stringify(bookings));
  console.log("sorted halls", JSON.stringify(halls));

  const hallHeaps = new Map();
  halls.forEach((hall) => {
    console.log(`Initializing hall: ${hall.id}, size: ${hall.capacity}`);
    hallHeaps.set(hall.id, new MinHeap());
  });

  const allocatedRequests = [];
  const failedRequests = [];

  for (const booking of bookings) {
    let assignedHall = null;
    let minEndTime = Infinity;

    console.log(`Trying to allocate booking: ${JSON.stringify(booking)}`);

    for (const hall of halls) {
      const heap = hallHeaps.get(hall.id);
      if (!heap) {
        console.error(`Heap not found for hall_id: ${hall.id}`);
        continue;
      }

      const earliestAvailable = heap.peek() || 0;

      console.log(`Checking hall: ${hall.id}, size: ${hall.capacity}`);
      console.log(
        `Earliest available: ${earliestAvailable}, Booking start time in minutes: ${booking.start_time_minutes}`
      );

      if (hall.capacity >= booking.capacity && earliestAvailable <= booking.start_time_minutes) {
        if (earliestAvailable < minEndTime) {
          assignedHall = hall;
          minEndTime = earliestAvailable;
        }
      }
    }

    if (assignedHall) {
      const endTime = booking.start_time_minutes + booking.duration;
      const heap = hallHeaps.get(assignedHall.id);
      heap.push(endTime);

      allocatedRequests.push({
        ...booking,
        hall_assigned: assignedHall.id,
        space_utilised: `${booking.capacity}/${assignedHall.capacity}`,
        profit: booking.profit,
      });

      console.log(`Allocated to hall: ${assignedHall.id}`);
    } else {
      failedRequests.push(booking);

      console.log(`Failed to allocate booking: ${booking.request_id}`);
    }
  }

  const totalProfit = calculateTotalProfit(allocatedRequests);

  return {
    allocatedRequests,
    failedRequests,
    totalProfit,
  };
};
