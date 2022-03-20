const express = require('express');

const authGuard = require('../middleware/authGuard');
const Contact = require('../models/contact');

const router = express.Router();

router.get('/', authGuard, async (req, res) => {
  // @ts-ignore
  const userId = req.user._id;

  try {
    const contacts = await Contact.find({
      user: userId,
    });

    if (!contacts) {
      return res.status(404).json({ message: 'No contacts found' });
    }

    res.json({
      message: 'Contacts fetched successfully',
      contactCount: contacts.length,
      contacts: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const contact = {
    id: 1,
    name: 'Billy',
    email: 'billy@example.com',
    phone: '555-555-5555',
  };

  res.json({
    message: 'Contact fetched successfully',
    contact: contact,
  });
});

router.post('/', authGuard, async (req, res) => {
  // @ts-ignore
  const userId = req.user._id;

  const { name, email, phone, type } = req.body;

  try {
    const newContact = new Contact({
      user: userId,
      name,
      email,
      phone,
      type,
    });

    const savedContact = await newContact.save();

    res.status(201).json({
      message: 'Contact created successfully',
      contact: savedContact,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact' });
  }
});

router.put('/:id', (req, res) => {
  const { name, email, phone } = req.body;

  res.json({
    message: 'Contact updated successfully',
    contact: {
      name,
      email,
      phone,
    },
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  res.json({
    message: 'Contact deleted successfully',
  });
});

module.exports = router;
