const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');

// @ROUTE     GET api/auth
// @DESC      GET LOGGED IN USER
// @ACCESS    PRIVATE
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE     POST api/auth
// @DESC      AUTH USER AND GET TOKEN
// @ACCESS    PUBLIC
router.post('/', [
  check('email', 'Please include a valid email address').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // IF EMAIL DOES NOT EXIST
    if(!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // IF PASSWORD IS INCORRECT
    if(!isMatch) {
      res.status(400).json({ msg: 'Invalid Credentials' })
    }

    // IF ALL IS GOOD WE WANT TO GET THE USERS ID FROM DB AND SEND BACK THE TOKEN 
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }

});

module.exports = router;