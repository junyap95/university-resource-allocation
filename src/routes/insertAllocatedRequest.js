import express from "express";
const router = express.Router();
import { insertAllocatedRequest } from "../services/sqlQueriesHelpers.js";

router.post("/", async (req, res, next) => {
  try {
    await insertAllocatedRequest(req.body);
    res.send({
      sqlMessage: "Booking Inserted Into Database!",
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.send({
        sqlMessage: "Duplicate Entry Found, Booking Not Inserted!",
      });
    }
    console.error("err ", error);
  }
});

export default router;
