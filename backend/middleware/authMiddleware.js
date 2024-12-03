const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Verify token and extract user details
// exports.verifyToken = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Token from Bearer header

//   if (!token) {
//     return res.status(401).json({ message: 'Access denied. No token provided.' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // Attach user info to the request
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token' });
//   }
// };
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Token from Bearer header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id) {
      return res.status(400).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Attach user info to the request
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Verify if the user is an admin
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
