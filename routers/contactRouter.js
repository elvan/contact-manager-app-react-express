const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Contacts fetched successfully',
    contactCount: 2,
    contacts: [
      {
        id: 1,
        name: 'Billy',
        email: 'billy@example.com',
        phone: '555-555-5555',
      },
      {
        id: 2,
        name: 'Karen',
        email: 'karen@example.com',
        phone: '555-555-5555',
      },
    ],
  });
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

router.post('/', (req, res) => {
  const { name, email, phone } = req.body;

  res.json({
    message: 'Contact created successfully',
    contact: {
      name,
      email,
      phone,
    },
  });
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
