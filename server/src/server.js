require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // 1. Log startup
    console.log('🚀 CareerPilot API initializing...');

    // 2. Start listening immediately (don't wait for DB)
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Server listening on port ${PORT}`);
      console.log(`🔗 Local Address: http://127.0.0.1:${PORT}`);
      console.log(`📡 Health Check: http://127.0.0.1:${PORT}/api/health`);
    });

    // 3. Connect to MongoDB in background
    console.log('🔗 Connecting to MongoDB...');
    await connectDB();
    console.log('✨ MongoDB Connection Established.');

  } catch (err) {
    console.error('💥 FAILED TO START SERVER:', err);
    process.exit(1);
  }
};

startServer();
