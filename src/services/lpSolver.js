import solver from 'javascript-lp-solver';

export const lpSolve = (model) => {
    solver.Solve(model)
    // console.log(solver.Solve(model));
}

// const model = {
//     "optimize": "profit",
//     "opType": "max",
//     "constraints": {
//         "wood": { "max": 300 },
//         "labor": { "max": 110 },
//         "storage": { "max": 400 }
//     },
//     "variables": {
//         "table": { "wood": 30, "labor": 5, "profit": 1200, "table": 1, "storage": 30 },
//         "dresser": { "wood": 20, "labor": 10, "profit": 1600, "dresser": 1, "storage": 50 }
//     },
//     "ints": { "table": 1, "dresser": 1 }
// };
// {feasible: true, result: 14400, table: 8, dresser: 3}

// Sample booking data (replace with your actual data)
const bookingRequests = [
    { id: 'booking1', start: 9, end: 11, capacity: 30, profit: 500 },
    { id: 'booking5', start: 10, end: 12, capacity: 40, profit: 700 },
    { id: 'booking3', start: 11, end: 13, capacity: 20, profit: 300 },
    { id: 'booking4', start: 14, end: 15, capacity: 60, profit: 300 },
    { id: 'booking2', start: 14, end: 15, capacity: 50, profit: 300 },
    { id: 'booking6', start: 14, end: 15, capacity: 20, profit: 250 },
    // Add more bookings as needed
];

const halls = [
    { id: 'hall1', capacity: 50 },
    { id: 'hall2', capacity: 40 },
    // Add more halls as needed
];

// Construct the model dynamically based on the booking requests and halls
const model = {
    "optimize": "profit",
    "opType": "max",
    "constraints": {},
    "variables": {},
    "ints": {}
};

// Add constraints to ensure each booking is assigned only once
bookingRequests.forEach(booking => {
    const bookingConstraint = {};
    halls.forEach(hall => {
        const variableName = `${booking.id}_${hall.id}`;
        bookingConstraint[variableName] = 1;

        model.variables[variableName] = {
            "profit": booking.profit,
            [`${hall.id}_capacity`]: booking.capacity,
        };

        bookingRequests.forEach(otherBooking => {
            if (otherBooking.id !== booking.id &&
                ((otherBooking.start >= booking.start && otherBooking.start < booking.end) ||
                    (otherBooking.end > booking.start && otherBooking.end <= booking.end) ||
                    (otherBooking.start < booking.start && otherBooking.end > booking.end))) {
                const otherVariableName = `${otherBooking.id}_${hall.id}`;
                if (!model.constraints[`${hall.id}_${variableName}_overlap`]) {
                    model.constraints[`${hall.id}_${variableName}_overlap`] = { "max": 1 };
                }
                model.constraints[`${hall.id}_${variableName}_overlap`][variableName] = 1;
                model.constraints[`${hall.id}_${variableName}_overlap`][otherVariableName] = 1;
            }
        });

        model.ints[variableName] = 1;
    });
    model.constraints[`assign_${booking.id}`] = { ...bookingConstraint, "max": 1 };
});

// Add constraints to ensure hall capacities are not exceeded
halls.forEach(hall => {
    const hallConstraint = {};
    bookingRequests.forEach(booking => {
        const variableName = `${booking.id}_${hall.id}`;
        hallConstraint[variableName] = booking.capacity;
    });
    model.constraints[`${hall.id}_capacity`] = { ...hallConstraint, "max": hall.capacity };
});

// console.log(model);
lpSolve(model);