const express = require('express');
const router = express.Router();
const {getAllClients} = require('../configs/mysql')

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const result = await getAllClients();
  res.send(result);
});

module.exports = router;
