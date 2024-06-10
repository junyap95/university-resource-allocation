import express from "express";
const router = express.Router();
import { getAllClients } from "../configs/mysql.js";

/* GET users listing. */
router.get("/", async (req, res, next) => {
  console.log("called");
  const result = await getAllClients();
  console.log(result);
  res.send(result);
});

export default router;
