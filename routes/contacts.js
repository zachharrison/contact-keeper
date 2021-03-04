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
router.post('/', [auth, [
  check('name', 'Name is required').not().isEmpty()
]] , async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      name, 
      email,
      phone,
      type,
      user: req.user.id
    });

    const contact = await newContact.save();
    
    res.json(contact);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE     PUT api/contacts/:id
// @DESC      EDIT A CONTACT FOR A USER
// @ACCESS    PRIVATE
router.put('/:id', auth, async (req, res) => {
  const { name, email, phone, type } = req.body;

  // BUILD A CONTACT OBJECT
  const contactFields = {};

  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;
  
  try {
    let contact = await Contact.findById(req.params.id);

    // IF USER DOES NOT HAVE A CONTACT WITH THE ID THAT IS PASSED IN
    if(!contact) {
      return res.status(404).json({ msg: 'Contact not found' });

    } else if (contact.user.toString() !== req.user.id) { // CHECK TO SEE IF THE USER OWNS THE CONTACT THAT THEY ARE TRYING TO EDIT
      return res.status(401).json({ msg: 'Not authorized' });
    }

    contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true } );

    res.json(contact);


  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @ROUTE     DELETE api/contacts/:id
// @DESC      DELETE A CONTACT FOR A USER
// @ACCESS    PRIVATE
router.delete('/:id', (req, res) => {
  res.send('Delete contact');
});

module.exports = router;