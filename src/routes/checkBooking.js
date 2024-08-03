import express from "express";
const router = express.Router();
import { checkBookingRequest } from "../configs/mysql.js"

router.get("/", async (req, res, next) => {
    const bookingRequest = await checkBookingRequest(req.query.reqID);
    res.send({
        bookingRequest
    })
})

export default router;