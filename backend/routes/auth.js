const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

// Validasi input
const validateRegisterInput = (data) => {
  const errors = {};
  
  if (!data.username || data.username.length < 3) {
    errors.username = 'Username minimal 3 karakter';
  }
  
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Email tidak valid';
  }
  
  if (!data.password || data.password.length < 6) {
    errors.password = 'Password minimal 6 karakter';
  }
  
  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);
    
    if (!isValid) {
      console.log('Validation errors:', errors);
      return res.status(400).json({ errors });
    }

    const { username, email, password } = req.body;
    
    // Check existing user
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: email }
        ]
      }
    });
    
    if (existingUser) {
      const message = existingUser.username === username ? 
        'Username sudah digunakan' : 'Email sudah terdaftar';
      console.log('Existing user error:', message);
      return res.status(400).json({ message });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password
    });

    // Return success response
    res.status(201).json({
      message: 'Registrasi berhasil',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan pada server',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: username } // Allow login with email too
        ]
      }
    });

    if (!user) {
      return res.status(401).json({
        message: 'Username/email atau password salah'
      });
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: 'Username/email atau password salah'
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        id: user.id,
        role: user.role 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // Return success response
    res.json({
      message: 'Login berhasil',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan pada server',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;