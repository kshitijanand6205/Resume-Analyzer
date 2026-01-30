import bcrypt from 'bcryptjs';
import { createUser, findByEmail } from '../models/user.model.js';
import { generateToken } from "../services/auth.service.js";
import logger from '../utils/logger.js';

export const register = async (req, res) => {
  try {
    const {email, password } = req.body;
    
    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        message: 'email, and password are required' 
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide a valid email address' 
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ 
        success: false,
        message: 'Password must be at least 6 characters long' 
      });
    }

    // Check if database is available
    const userExists = await findByEmail(email);
    if (userExists) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(email, hashedPassword);

    
    res.status(201).json({ 
      success: true,
      message: 'User registered successfully',
      userId 
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.message === 'Database is not available') {
      res.status(503).json({ 
        success: false,
        message: 'Database service is temporarily unavailable. Please try again later.' 
      });
    } else {
      res.status(500).json({ 
        success: false,
        message: 'Registration failed. Please try again.' 
      });
    }
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};