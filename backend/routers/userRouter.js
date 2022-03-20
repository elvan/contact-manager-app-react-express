const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const express = require('express');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const User = require('../models/user');
const authGuard = require('../middleware/authGuard');

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
          token: generateToken(newUser._id),
        },
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
);

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.json({
        message: 'User logged in successfully',
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
        },
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ message: 'Server Error' });
    }
  }
);

router.get('/current-user', authGuard, (req, res) => {
  // @ts-ignore
  const currentUser = req.user;

  res.json({
    message: 'Current user fetched successfully',
    user: currentUser,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = router;
