import bcrypt from 'bcryptjs';
//import jwt from 'jsonwebtoken';
import { createUser, findByEmail } from '../models/user.model.js';
import logger from '../utils/logger.js';
import { generateToken } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(email, hashedPassword);
    res.status(201).json({ message: 'User registered', userId });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // res.json({ token });
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