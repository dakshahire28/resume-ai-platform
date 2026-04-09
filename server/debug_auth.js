const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const debug = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const users = await User.find({});
    console.log(`Found ${users.length} users`);

    for (const u of users) {
      const isHashed = u.password.startsWith('$2a$') || u.password.startsWith('$2b$');
      console.log(`User: ${u.email}, Password starts with $2: ${isHashed}`);
      
      // Test manual match for a known password 'password123' if you know it
      // const match = await bcrypt.compare('password123', u.password);
      // console.log(`Match for 'password123': ${match}`);
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

debug();
