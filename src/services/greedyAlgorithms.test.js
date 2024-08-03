import { timeGreedy, durationGreedy, randomGreedy } from "./greedyAlgorithms";

describe("Greedy Algorithms - No Time Overlapping", () => {
    const bookings = [
        {
            client_id: 1,
            start_time: "9:00:00",
            end_time: "11:00:00",
            capacity: 30,
        },
        {
            client_id: 2,
            start_time: "12:00:00",
            end_time: "13:00:00",
            capacity: 35,
        },
    ];

    const lectureHalls = [
        {
            id: 1,
            capacity: 50,
        },
    ];

    const expectedAllocation = {
        allocatedRequests: [
            {
                capacity: 30,
                client_id: 1,
                start_time: "9:00:00",
                end_time: "11:00:00",
                hall_assigned: 1,
                profit: 200,
                space_utilised: "30/50",
            },
            {
                capacity: 35,
                client_id: 2,
                start_time: "12:00:00",
                end_time: "13:00:00",
                profit: 100,
                space_utilised: "35/50",
                hall_assigned: 1,
            },
        ],
        failedRequests: [],
        "totalProfit": 300,
    };

    describe("timeGreedy", () => {
        it("WHEN there is no overlap, THEN it should allocate to all requests", () => {
            const timeGreedyResult = timeGreedy(bookings, lectureHalls);
            expect(timeGreedyResult).toEqual(expectedAllocation);
        });
    });

    describe("durationGreedy", () => {
        it("WHEN there is no overlap, THEN it should allocate to all requests", () => {
            const durationGreedyResult = durationGreedy(bookings, lectureHalls);
            expect(durationGreedyResult).toEqual(expectedAllocation);
        });
    });
});

describe("Greedy Algorithms - Time Overlapping", () => {
    const bookings = [
        {
            client_id: 1,
            start_time: "9:00:00",
            end_time: "11:00:00",
            capacity: 30,
        },
        {
            client_id: 2,
            start_time: "10:30:00",
            end_time: "16:00:00",
            capacity: 35,
        },
    ];

    const lectureHalls = [
        {
            id: 1,
            capacity: 50,
        },
    ];

    const expectedAllocationTime = {
        allocatedRequests: [
            {
                capacity: 30,
                client_id: 1,
                start_time: "9:00:00",
                end_time: "11:00:00",
                hall_assigned: 1,
                profit: 200,
                space_utilised: "30/50",
            },
        ],
        failedRequests: [
            {
                capacity: 35,
                client_id: 2,
                start_time: "10:30:00",
                end_time: "16:00:00",
            },
        ],
        totalProfit: 200,
    };

    const expectedAllocationDuration = {
        allocatedRequests: [
            {
                client_id: 2,
                start_time: "10:30:00",
                end_time: "16:00:00",
                hall_assigned: 1,
                capacity: 35,
                profit: 550,
                space_utilised: "35/50",
            },
        ],
        failedRequests: [
            {
                capacity: 30,
                client_id: 1,
                start_time: "9:00:00",
                end_time: "11:00:00",
            },
        ],
        totalProfit: 550,
    };

    describe("timeGreedy", () => {
        it("WHEN there is an overlap, THEN it should allocate to request that starts earlier", () => {
            const timeGreedyResult = timeGreedy(bookings, lectureHalls);
            expect(timeGreedyResult).toEqual(expectedAllocationTime);
        });
    });

    describe("durationGreedy", () => {
        it("WHEN there is an overlap, THEN it should allocate to all request that has longer duration", () => {
            const durationGreedyResult = durationGreedy(bookings, lectureHalls);
            expect(durationGreedyResult).toEqual(expectedAllocationDuration);
        });
    });
});

describe("Random Greedy Algorithm - No Time Overlapping", () => {
    beforeAll(() => {
        // Mock Math.random to return predictable values
        jest.spyOn(Math, 'random').mockImplementation(() => 0.5);
    });

    afterAll(() => {
        // Restore Math.random to its original implementation
        Math.random.mockRestore();
    });

    const bookings = [
        {
            client_id: 1,
            start_time: "9:00:00",
            end_time: "11:00:00",
            capacity: 30,
        },
        {
            client_id: 2,
            start_time: "12:00:00",
            end_time: "13:00:00",
            capacity: 35,
        },
        {
            client_id: 3,
            start_time: "15:00:00",
            end_time: "18:00:00",
            capacity: 40,
        },
    ];

    const lectureHalls = [
        {
            id: 1,
            capacity: 50,
        },
    ];

    const expectedAllocation = {
        allocatedRequests: [
            {
                capacity: 30,
                client_id: 1,
                start_time: "9:00:00",
                end_time: "11:00:00",
                hall_assigned: 1,
                profit: 200,
                space_utilised: "30/50",
            },
            {
                client_id: 3,
                start_time: "15:00:00",
                end_time: "18:00:00",
                capacity: 40,
                hall_assigned: 1,
                profit: 300,
                space_utilised: "40/50",
            },
            {
                capacity: 35,
                client_id: 2,
                start_time: "12:00:00",
                end_time: "13:00:00",
                hall_assigned: 1,
                profit: 100,
                space_utilised: "35/50",
            },
        ],
        failedRequests: [],
        "totalProfit": 600,
    };

    describe("randomGreedy", () => {
        it("WHEN there is no overlap, THEN it should allocate to all requests regardless of randomness", () => {
            const randomGreedyResult = randomGreedy(bookings, lectureHalls);
            expect(randomGreedyResult).toEqual(expectedAllocation);
        });
    });
});

describe("Random Greedy Algorithm - Time Overlapping", () => {
    beforeAll(() => {
        // Mock Math.random to return predictable values
        jest.spyOn(Math, 'random').mockImplementation(() => 0.5);
    });

    afterAll(() => {
        // Restore Math.random to its original implementation
        Math.random.mockRestore();
    });

    const bookings = [
        {
            client_id: 1,
            start_time: "9:00:00",
            end_time: "11:00:00",
            capacity: 30,
            profit: 200,
            space_utilised: "30/50",
        },
        {
            client_id: 2,
            start_time: "10:30:00",
            end_time: "16:00:00",
            capacity: 35,
        },
        {
            client_id: 3,
            start_time: "15:00:00",
            end_time: "18:00:00",
            capacity: 40,
        },
    ];

    const lectureHalls = [
        {
            id: 1,
            capacity: 50,
        },
    ];

    const expectedAllocation = {
        allocatedRequests: [
            {
                capacity: 30,
                client_id: 1,
                start_time: "9:00:00",
                end_time: "11:00:00",
                hall_assigned: 1,
                profit: 200,
                space_utilised: "30/50",
            }, {
                client_id: 3,
                start_time: "15:00:00",
                end_time: "18:00:00",
                capacity: 40,
                hall_assigned: 1,
                profit: 300,
                space_utilised: "40/50",
            },
        ],
        failedRequests: [
            {
                capacity: 35,
                client_id: 2,
                start_time: "10:30:00",
                end_time: "16:00:00",
            },],
        totalProfit: 500,
    };

    describe("randomGreedy", () => {
        it("WHEN there is overlap, THEN it allocates randomly regardless of randomness", () => {
            const randomGreedyResult = randomGreedy(bookings, lectureHalls);
            expect(randomGreedyResult).toEqual(expectedAllocation);
        });
    });
});