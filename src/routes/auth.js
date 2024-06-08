// const express = require("express");
// const router = express.Router();
// import { bookingValidation } from "../services/formValidation";
// const pool = require("../configs/mysql");
//
// router.post("/booking-auth", async (req, res) => {
//   const { error } = bookingValidation(req.body);
//   if (error) {
//     return res.status(401).send({ error: error["details"][0]["message"] });
//   }
//   // to prevent user registers with the same email multiple times
//   const emailExists = await pool.execute(`select ${req.body.email} from email`);
//   if (emailExists) {
//     return res
//       .status(400)
//       .send({ message: "This email address already exists!" });
//   }
//
//   const newUser = new User({
//     username: req.body.username,
//     email: req.body.email,
//     // input the hashed password instead of raw password
//     password: hashedPassword,
//   });
//
//   try {
//     const saveUser = await newUser.save();
//     return res.send(saveUser);
//   } catch (error) {
//     return res.status(400).send({ error: error["details"][0]["message"] });
//   }
// });
