import express from "express";
const router = express.Router();

router.get("/", async (req, res, next) => {
  const allocatedRequest = await checkBookingRequest(req.query.reqID);
  res.send({
    bookingRequest,
  });
});

export default router;
