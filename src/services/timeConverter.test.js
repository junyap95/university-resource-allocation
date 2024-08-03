import { timeStringToSeconds, timeStringParser } from "./timeConverter";

describe("Time String Convertor Test", () => {

    const midnight = "00:00:00";
    const noon = "12:00:00";
    const morning = "03:00:00";
    const night = "21:00:00"

    describe("HH:MM:SS string to seconds", () => {
        it("CONVERT midnight string TO 0", () => {
            const midnightResult = timeStringToSeconds(midnight);
            expect(midnightResult).toEqual(0);
        })
        it("CONVERT noon string TO seconds", () => {
            const noonResult = timeStringToSeconds(noon);
            expect(noonResult).toEqual(12 * 3600);
        })
        it("CONVERT morning string TO seconds", () => {
            const morningResult = timeStringToSeconds(morning);
            expect(morningResult).toEqual(3 * 3600);
        })
        it("CONVERT night string TO seconds", () => {
            const nightResult = timeStringToSeconds(night);
            expect(nightResult).toEqual(21 * 3600);
        })
    })

    describe("HH:MM:SS string to HHMM number", () => {
        it("CONVERT midnight string TO 0000", () => {
            const midnightResult = timeStringParser(midnight);
            expect(midnightResult).toEqual(0);
        })
        it("CONVERT noon string TO 1200", () => {
            const noonResult = timeStringParser(noon);
            expect(noonResult).toEqual(1200);
        })
        it("CONVERT morning string TO 0300", () => {
            const morningResult = timeStringParser(morning);
            expect(morningResult).toEqual(300);
        })
        it("CONVERT night string TO 2100", () => {
            const nightResult = timeStringParser(night);
            expect(nightResult).toEqual(2100);
        })
    })


})