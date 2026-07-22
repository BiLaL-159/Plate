const jwt = require('jsonwebtoken');
const config = require('../config/env');
const User = require('../models/user');

async function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const token = authHeader.slice('Bearer '.length);
    const decoded = jwt.verify(token, config.jwtSecret);

    const userDocument = await User.findById(decoded.id);
    if (!userDocument) {
      return res.status(401).json({ message: 'User not found' });
    }

    const user = typeof userDocument.select === 'function'
      ? await userDocument.select('-password')
      : userDocument;

    req.user = user;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

function requireRestaurantOwner(req, res, next) {
  if (!req.user || req.user.role !== 'restaurant_owner') {
    return res.status(403).json({ message: 'Restaurant owner access required' });
  }

  return next();
}

module.exports = {
  authenticate,
  requireRestaurantOwner,
};
