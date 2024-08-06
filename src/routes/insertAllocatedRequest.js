import express from "express";
const router = express.Router();
import { insertAllocatedRequest } from "../services/sqlQueriesHelpers.js";
import {
  SUCCESS_MESSAGE,
  DUPLICATE_ENTRY_MESSAGE,
} from "../utilities/constants.js";

router.post("/", async (req, res, next) => {
  try {
    await insertAllocatedRequest(req.body);
    res.send(SUCCESS_MESSAGE);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.send(DUPLICATE_ENTRY_MESSAGE);
    } else {
      console.error("Error: ", error);
      next(error); // Pass the error to the next middleware //next() with no arguments says "just kidding, I don't actual want to handle this".
    }
  }
});

export default router;
