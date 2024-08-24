import { allocateRecursive } from "./dynamicAllocation";

describe("allocateRecursive", () => {
  const bookingMap = [
    { request_id: "req1", capacity: 50, start_time: "9:00:00", end_time: "11:00:00" },
    { request_id: "req2", capacity: 100, start_time: "9:00:00", end_time: "11:00:00" },
    { request_id: "req3", capacity: 150, start_time: "9:00:00", end_time: "11:00:00" },
    { request_id: "req4", capacity: 200, start_time: "9:00:00", end_time: "11:00:00" },
  ];

  const hallMap = [
    { id: "hall1", capacity: 100 },
    { id: "hall2", capacity: 150 },
    { id: "hall3", capacity: 200 },
  ];

  test("should allocate requests to available halls", () => {
    const result = allocateRecursive(0, [], bookingMap, hallMap);

    expect(result.allocatedRequests).toEqual([
      {
        ...bookingMap[1],
        hall_assigned: "hall1",
        space_utilised: "100/100",
        profit: 200,
      },
      {
        ...bookingMap[2],
        hall_assigned: "hall2",
        space_utilised: "150/150",
        profit: 200,
      },
      {
        ...bookingMap[3],
        hall_assigned: "hall3",
        space_utilised: "200/200",
        profit: 200,
      },
    ]);
    expect(result.totalProfit).toBe(600);
    expect(result.failedRequests).toEqual([
      {
        capacity: 50,
        end_time: "11:00:00",
        request_id: "req1",
        start_time: "9:00:00",
      },
    ]);
  });

  test("should not allocate a request if no hall is available", () => {
    const limitedHallMap = [{ id: "hall1", capacity: 50 }];
    const result = allocateRecursive(0, [], bookingMap, limitedHallMap);

    expect(result.allocatedRequests).toEqual([
      {
        ...bookingMap[0],
        hall_assigned: "hall1",
        space_utilised: "50/50",
        profit: 200,
      },
    ]);
    expect(result.totalProfit).toBe(200);
    expect(result.failedRequests).toEqual([
      { request_id: "req2", capacity: 100, start_time: "9:00:00", end_time: "11:00:00" },
      { request_id: "req3", capacity: 150, start_time: "9:00:00", end_time: "11:00:00" },
      { capacity: 200, end_time: "11:00:00", request_id: "req4", start_time: "9:00:00" },
    ]);
  });

  test("should skip request if no hall meets the capacity requirement", () => {
    const smallHalls = [
      { id: "hall1", capacity: 30 },
      { id: "hall2", capacity: 40 },
    ];
    const result = allocateRecursive(0, [], bookingMap, smallHalls);

    expect(result.allocatedRequests).toEqual([]);
    expect(result.totalProfit).toBe(0);
    expect(result.failedRequests).toEqual(bookingMap);
  });

  test("should return memoized result on re-computation with the same state", () => {
    // Run the function twice with the same input
    const result1 = allocateRecursive(0, [], bookingMap, hallMap);
    const result2 = allocateRecursive(0, [], bookingMap, hallMap);

    // Ensure memoization works by comparing results
    expect(result1).toEqual(result2);
  });

  test("should prioritize higher profit bookings and maximize space utilization", () => {
    const bookingMap2 = [
      { request_id: "req1", capacity: 100, start_time: "9:00:00", end_time: "12:00:00" }, // 3 hours
      { request_id: "req2", capacity: 150, start_time: "9:00:00", end_time: "12:00:00" }, // 3 hours, higher capacity
      { request_id: "req3", capacity: 120, start_time: "9:00:00", end_time: "12:00:00" }, // 3 hours, slightly higher capacity, different time
    ];

    const hallMap = [
      { id: "hall1", capacity: 150 },
      { id: "hall2", capacity: 120 },
    ];

    const result = allocateRecursive(0, [], bookingMap2, hallMap);

    // Assuming the profit is proportional to the duration (3 hours each)
    expect(result.allocatedRequests).toEqual([
      {
        ...bookingMap2[1],
        hall_assigned: "hall1",
        space_utilised: "150/150",
        profit: 300,
      },
      {
        ...bookingMap2[2],
        hall_assigned: "hall2",
        space_utilised: "120/120",
        profit: 300,
      },
    ]);

    expect(result.totalProfit).toBe(600);
    expect(result.failedRequests).toEqual([
      { request_id: "req1", capacity: 100, start_time: "9:00:00", end_time: "12:00:00" },
    ]);
  });
});
