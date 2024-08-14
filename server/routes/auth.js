const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Principal adds a teacher or student
router.post('/add-user', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, password, role });
    await user.save();

    res.status(201).json({ message: `${role} created successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login route
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log('Received email:', email);   // Log the email
      console.log('Received password:', password); // Log the password
  
      const user = await User.findOne({ email });
  
      if (!user || !(await user.matchPassword(password))) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, 'your_jwt_secret', {
        expiresIn: '1d',
      });
  
      res.status(200).json({ token, role: user.role });
    } catch (error) {
      console.error('Server error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
module.exports = router;
