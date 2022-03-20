const express = require('express');

const authGuard = require('../middleware/authGuard');
const Contact = require('../models/contact');

const router = express.Router();

router.get('/', authGuard, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user._id;

    const contacts = await Contact.find({
      user: userId,
    });

    if (contacts.length === 0) {
      return res.status(404).json({
        message: 'No contacts found',
        contactCount: 0,
      });
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

router.get('/:id', authGuard, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user._id;

    const { id } = req.params;

    const contact = await Contact.findById(id);

    if (!contact) {
      console.log('Contact not found');
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (contact.user.toString() !== userId.toString()) {
      console.log('Not authorized to access this contact');
      return res
        .status(401)
        .json({ message: 'Not authorized to access this contact' });
    }

    res.json({
      message: 'Contact fetched successfully',
      contact: contact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error fetching contact',
    });
  }
});

router.post('/', authGuard, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user._id;

    const { name, email, phone, type } = req.body;

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

router.put('/:id', authGuard, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user._id;

    const { name, email, phone, type } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      console.log('Contact not found');
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (contact.user.toString() !== userId.toString()) {
      console.log('Not authorized to access this contact');
      return res
        .status(401)
        .json({ message: 'Not authorized to access this contact' });
    }

    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    contact.type = type;

    const updatedContact = await contact.save();

    res.status(200).json({
      message: 'Contact updated successfully',
      contact: updatedContact,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating contact' });
  }
});

router.delete('/:id', authGuard, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user._id;

    const id = req.params.id;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      console.log('Contact not found');
      return res.status(404).json({ message: 'Contact not found' });
    }

    if (contact.user.toString() !== userId.toString()) {
      console.log('Not authorized to access this contact');
      return res
        .status(401)
        .json({ message: 'Not authorized to access this contact' });
    }

    await contact.remove();

    res.json({
      message: 'Contact deleted successfully',
      id: id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting contact' });
  }
});

module.exports = router;
