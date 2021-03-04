const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @ROUTE     GET api/contacts
// @DESC      GET ALL CONTACTS FOR A USER
// @ACCESS    PRIVATE
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
    res.json(contacts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE     POST api/contacts
// @DESC      ADD A NEW CONTACT
// @ACCESS    PRIVATE
router.post('/', (req, res) => {
  res.send('Added a new contact');
});

// @ROUTE     PUT api/contacts/:id
// @DESC      EDIT A CONTACT FOR A USER
// @ACCESS    PRIVATE
router.put('/:id', (req, res) => {
  res.send('Update contact');
});

// @ROUTE     DELETE api/contacts/:id
// @DESC      DELETE A CONTACT FOR A USER
// @ACCESS    PRIVATE
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;