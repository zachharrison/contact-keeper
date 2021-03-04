const express = require('express');
const router = express.Router();

// @ROUTE     GET api/auth
// @DESC      GET LOGGED IN USER
// @ACCESS    PRIVATE
router.get('/', (req, res) => {
  res.send('Get logged in user');
});

// @ROUTE     GET api/auth
// @DESC      AUTH USER AND GET TOKEN
// @ACCESS    PUBLIC
router.post('/', (req, res) => {
  res.send('Login user');
});

module.exports = router;