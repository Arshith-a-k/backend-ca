const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  const { username, email, password, dateOfBirth } = req.body;

  // Input validation with simple if-else
  if (!username) {
    return res.status(400).json({ error: "Username cannot be empty" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email cannot be empty" });
  }

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  } else if (password.length < 8 || password.length > 16) {
    return res.status(400).json({ error: "Password length should be greater than 8 or less than or equal to 16" });
  }

  if (!dateOfBirth) {
    return res.status(400).json({ error: "Date of Birth is required" });
  }

  try {
    const newUser = await User.create({ username, email, password, dateOfBirth });
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
