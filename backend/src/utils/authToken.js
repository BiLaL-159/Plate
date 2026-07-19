const jwt = require('jsonwebtoken');
const config = require('../config/env');

function createAuthToken(user) {
  return jwt.sign(user, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
}

module.exports = createAuthToken;
