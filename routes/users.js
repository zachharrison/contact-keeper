const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
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
], async (req, res) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email }); 

    if (user) {
      res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name, 
      email,
      password
    });
    
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    
    // IF ALL IS GOOD WE WANT TO SAVE USER TO THE DB AND GET USERS ID THEN SEND BACK THE TOKEN 
    await user.save();

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
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

module.exports = router;