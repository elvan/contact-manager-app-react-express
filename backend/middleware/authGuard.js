const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../models/user');

const authGuard = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1];

      if (!token) {
        res.status(401).json({ message: 'Please provide a valid token' });
      }

      const decoded = jwt.verify(token, JWT_SECRET);

      // @ts-ignore
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(500).json({ message: 'Error parsing token' });
    }
  } else {
    res.status(401).json({ message: 'No token provided' });
  }
});

module.exports = authGuard;
