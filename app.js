import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from "./src/routes/index.js";
import viewEntryRouter from "./src/routes/viewAllBookings.js";
import executeAlgorithmRouter from "./src/routes/executeAlgorithms.js";
import insertClientRequestRouter from "./src/routes/insertClientRequest.js";
import checkBookingRouter from "./src/routes/checkBooking.js";
import insertAllocatedRequestRouter from "./src/routes/insertAllocatedRequest.js";
import updateBookingStatusRouter from "./src/routes/updateBookingStatus.js";
import getAllocatedBookingsRouter from "./src/routes/getAllocatedBookings.js";
import logger from "./src/utilities/logger.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/", indexRouter);
app.use("/view-entry", viewEntryRouter);
app.use("/view-entry/all-bookings", viewEntryRouter);

app.use("/execute-algorithm", executeAlgorithmRouter);
app.use("/insert-client-and-request", insertClientRequestRouter);
app.use("/insert-allocated-request", insertAllocatedRequestRouter);
app.use("/update-booking-status", updateBookingStatusRouter);
app.use("/check-booking", checkBookingRouter);
app.use("/get-allocated-bookings", getAllocatedBookingsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong! Please try again...");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.log(logger.level, `Server Running On Port ${PORT}`);
});

export default app;
