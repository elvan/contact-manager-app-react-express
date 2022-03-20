const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const User = require('../models/user');

const authGuard = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(500);
      throw new Error('Error parsing token');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('No token provided');
  }
});

module.exports = authGuard;
