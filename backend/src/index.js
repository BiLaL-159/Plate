const mongoose = require('mongoose');
const config = require('./config/env');
const createApp = require('./app');
const connectDatabase = require('./db/connect');

let server;

async function start() {
  try {
    await connectDatabase();
    console.log('MongoDB connected');

    const app = createApp();
    server = app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

async function shutdown(signal) {
  console.log(`${signal} received. Closing server.`);

  if (server) {
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
    return;
  }

  await mongoose.disconnect();
  process.exit(0);
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

start();
