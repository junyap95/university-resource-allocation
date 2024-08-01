
import { timeGreedy } from "./greedyAlgorithms";

describe("timeGreedy", () => {
    it("WHEN there is no overlap, THEN should allocate to all requests", () => {
        const bookings = [
            {
                client_id: 1,
                start_time: "9:00:00",
                end_time: 1100,
                capacity: 30,
            },
            {
                client_id: 2,
                start_time: 1100,
                end_time: 1230,
                capacity: 35,
            },
        ];

        const lectureHalls = [
            {
                id: 1,
                capacity: 50,
            },
        ];

        const result = timeGreedy(bookings, lectureHalls);
        expect(result).toEqual([
            {
                capacity: 30,
                client_id: 1,
                end_time: 1100,
                hall_assigned: 1,
                start_time: 900,
            },
            {
                capacity: 35,
                client_id: 2,
                end_time: 1230,
                hall_assigned: 1,
                start_time: 1100,
            },
        ]);
    });

    it("WHEN there is an overlap, THEN should allocate to earliest time ", () => {
        const bookings = [
            {
                client_id: 1,
                start_time: 900,
                end_time: 1100,
                capacity: 30,
            },
            {
                client_id: 2,
                start_time: 1000,
                end_time: 1230,
                capacity: 35,
            },
        ];

        const lectureHalls = [
            {
                id: 1,
                capacity: 50,
            },
        ];

        const result = timeGreedy(bookings, lectureHalls);
        expect(result).toEqual([
            {
                capacity: 30,
                client_id: 1,
                end_time: 1100,
                hall_assigned: 1,
                start_time: 900,
            },
        ]);
    });
});
