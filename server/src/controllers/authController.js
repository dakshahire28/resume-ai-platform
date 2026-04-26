const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    const user = await User.create({ name, email: email.toLowerCase(), password });
    generateTokenAndSetCookie(res, user._id);

    res.status(201).json({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.error('[AUTH] Signup error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await user.matchPassword(password))) {
      generateTokenAndSetCookie(res, user._id);
      res.status(200).json({ _id: user._id, name: user.name, email: user.email });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('[AUTH] Login error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully' });
};

exports.verify = async (req, res) => {
  // If the protect middleware passes, the user is valid
  res.status(200).json({ _id: req.user._id, name: req.user.name, email: req.user.email });
};

exports.deleteAccount = async (req, res) => {
  try {
    const Resume = require('../models/Resume');

    // Delete all resumes belonging to this user
    await Resume.deleteMany({ user: req.user._id });

    // Delete the user account
    await User.findByIdAndDelete(req.user._id);

    // Clear the auth cookie
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('[AUTH] Delete account error:', error);
    res.status(500).json({ message: error.message });
  }
};
