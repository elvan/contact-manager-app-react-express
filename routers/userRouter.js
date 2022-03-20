const express = require('express');

const router = express.Router();

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  res.json({
    message: 'User registered successfully',
    user: {
      name,
      email,
    },
  });
});

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
