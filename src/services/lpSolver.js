import solver from "javascript-lp-solver";

// const model = {
//   optimize: "profit",
//   opType: "max",
//   constraints: {
//     wood: { max: 300 },
//     labor: { max: 110 },
//     storage: { max: 400 },
//   },
//   variables: {
//     table: { wood: 30, labor: 5, profit: 1200, table: 1, storage: 30 },
//     dresser: { wood: 20, labor: 10, profit: 1600, dresser: 1, storage: 50 },
//   },
//   ints: { table: 1, dresser: 1 },
// };
// {feasible: true, result: 14400, table: 8, dresser: 3}

const bookingRequests = [
  { id: "booking1", start: 10, end: 12, capacity: 30, profit: 200 },
  { id: "booking2", start: 11, end: 13, capacity: 10, profit: 200 },
  { id: "booking3", start: 12, end: 14, capacity: 40, profit: 200 },
  { id: "booking4", start: 13, end: 15, capacity: 20, profit: 200 },
];

const intervalsSorter = (br) => {
  const res = [];
  for (let i = 0; i < br.length; i++) {
    const temp = [];
    for (let j = i + 1; j < br.length; j++) {
      if (j >= br.length) break;
      if (i === 0) {
        temp.push(br[i]);
      }
      if (br[j].start > br[i].end || br[j].end < br[i].start) {
        temp.push(br[j]);
      }
    }
    res.push(temp);
  }
  return res;
};

const isOverlapping = (booking1, booking2) => {
  return booking1.start < booking2.end && booking2.start < booking1.end;
};

const findNonOverlappingCombinations = (bookings, start = 0, currentCombination = []) => {
  const results = [];

  for (let i = start; i < bookings.length; i++) {
    const booking = bookings[i];

    // Check if the current booking overlaps with any in the current combination
    if (currentCombination.every((b) => !isOverlapping(b, booking))) {
      const newCombination = [...currentCombination, booking];

      // Add this valid combination to the results
      results.push(newCombination);

      // Recurse to find further combinations
      results.push(...findNonOverlappingCombinations(bookings, i + 1, newCombination));
    }
  }

  return results;
};

console.log(findNonOverlappingCombinations(bookingRequests));

// const halls = [{ id: "hall1", capacity: 50 }];

// const model = {
//   optimize: "profit",
//   opType: "max",
//   constraints: {
//     capacity: { max: 300 },
//   },
//   variables: {},
//   ints: {},
// };

// const results = solver.Solve(model);
// console.log("Solver Results:", results);

[
  [{ id: "booking1", start: 10, end: 12, capacity: 30, profit: 200 }],
  [
    { id: "booking1", start: 10, end: 12, capacity: 30, profit: 200 },
    { id: "booking3", start: 12, end: 14, capacity: 40, profit: 200 },
  ],
  [
    { id: "booking1", start: 10, end: 12, capacity: 30, profit: 200 },
    { id: "booking4", start: 13, end: 15, capacity: 20, profit: 200 },
  ],
  [{ id: "booking2", start: 11, end: 13, capacity: 10, profit: 200 }],
  [
    { id: "booking2", start: 11, end: 13, capacity: 10, profit: 200 },
    { id: "booking4", start: 13, end: 15, capacity: 20, profit: 200 },
  ],
  [{ id: "booking3", start: 12, end: 14, capacity: 40, profit: 200 }],
  [{ id: "booking4", start: 13, end: 15, capacity: 20, profit: 200 }],
];
