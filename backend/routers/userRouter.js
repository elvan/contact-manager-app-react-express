const express = require('express');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/user');

const router = express.Router();

router.post(
  '/register',
  [
    check('name', 'Please provide a name').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        name,
        email,
      },
    });
  }
);

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  res.json({
    message: 'User logged in successfully',
    user: {
      email,
      token: '',
    },
  });
});

router.get('/current-user', (req, res) => {
  res.json({
    message: 'Current user fetched successfully',
    user: {
      name: 'Aaron',
      email: 'aaron@example.com',
    },
  });
});

module.exports = router;
