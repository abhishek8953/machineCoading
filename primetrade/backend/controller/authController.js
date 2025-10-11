import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    const user = await User.create({ username, email, password, role });
    res.status(201).json({ token: generateToken(user._id), role: user.role });
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if(!user || !(await user.comparePassword(password)))
      return res.status(400).json({ message: 'Invalid credentials' });
    res.json({ token: generateToken(user._id), role: user.role });
  } catch(err) {
    res.status(500).json({ message: err.message });
  }
}

export const getProfile = async (req, res) => {
  res.json(req.user);
}
