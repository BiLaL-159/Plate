const mongoose = require('mongoose');
const config = require('../config/env');

async function connectDatabase() {
  mongoose.set('strictQuery', true);

  await mongoose.connect(config.mongoUri, {
    serverSelectionTimeoutMS: 10000,
  });

  return mongoose.connection;
}

module.exports = connectDatabase;
