import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import indexRouter from "./src/routes/index.js";
import viewAllBookingsRouter from "./src/routes/viewAllBookings.js";
import greedyAllocationRouter from "./src/routes/greedyAllocation.js";
import insertClientRequestRouter from "./src/routes/insertClientRequest.js";
import checkBookingRouter from "./src/routes/checkBooking.js";
import insertAllocatedRequestRouter from "./src/routes/insertAllocatedRequest.js";

dotenv.config();

const app = express();

// view engine setup
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), "public")));

app.use("/", indexRouter);
app.use("/view-all-bookings", viewAllBookingsRouter);
app.use("/allocate-greedy", greedyAllocationRouter);
app.use("/insert-client-and-request", insertClientRequestRouter);
app.use("/insert-allocated-request", insertAllocatedRequestRouter);
app.use("/check-booking", checkBookingRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // render the error page
  res.status(500).send("Something went wrong! Please try again...");
});

app.listen(3001, () => {
  // demonstrates server is working
  console.log("Server Running...");
});

export default app;
