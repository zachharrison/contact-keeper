const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const User = require('../models/User')

// @ROUTE     POST api/users
// @DESC      REGISTER A USER
// @ACCESS    PUBLIC
router.post('/', [
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with at least 6 characters').isLength({ min: 6 })
], (req, res) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  res.send('Passed')
});

module.exports = router;