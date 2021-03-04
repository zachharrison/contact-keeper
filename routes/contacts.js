const express = require('express');
const router = express.Router();

// @ROUTE     GET api/contacts
// @DESC      GET ALL CONTACTS FOR A USER
// @ACCESS    PRIVATE
router.get('/', (req, res) => {
  res.send('Get all contacts');
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