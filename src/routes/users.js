const express = require('express');
const router = express.Router();
const {getAllClients} = require('../configs/mysql')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  console.log("called");
  const result = await getAllClients();
  console.log(result);
  res.send(result);
  // return result;
});

module.exports = router;
