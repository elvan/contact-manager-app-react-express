const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/user');

dotenv.config();

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
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: 'User already exists',
            },
          ],
        });
      }

      const salt = await bcrypt.genSalt(10);

      const newUser = new User({
        name: name,
        email: email,
        password: await bcrypt.hash(password, salt),
      });

      await newUser.save();

      return res.status(201).json({
        message: 'User registered successfully',
        user: {
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
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
