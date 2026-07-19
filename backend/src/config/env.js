const dotenv = require('dotenv');

dotenv.config();

const env = process.env.NODE_ENV || 'development';
const port = Number.parseInt(process.env.PORT || '5001', 10);

function requireEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

module.exports = {
  env,
  isProduction: env === 'production',
  port,
  mongoUri: requireEnv('MONGODB_URI'),
  jwtSecret: requireEnv('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8080',
};
