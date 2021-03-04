const express = require('express');
const router = express.Router();

// @ROUTE     POST api/users
// @DESC      REGISTER A USER
// @ACCESS    PUBLIC
router.post('/', (req, res) => {
  res.send('Registered a user :)');
});

module.exports = router;