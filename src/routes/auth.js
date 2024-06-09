const express = require("express");
const router = express.Router();
const pool = require("../configs/mysql");

const insertBooking = () => {};

router.post("/", async (req, res) => {
  try {
    const request = req.body;
    console.log(request, "req body");
    // sql

    // return a booking id using nanoid or something
    res.send({ test: "test" });
  } catch (e) {
    res.status(404).send(e);
  }
});

module.exports = router;
