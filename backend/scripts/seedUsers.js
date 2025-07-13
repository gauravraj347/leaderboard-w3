const mongoose = require('mongoose');
const User = require('../models/user');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const users = [
  'Rahul', 'Kamal', 'Sanak', 'Amit', 'Priya',
  'Sneha', 'Vikas', 'Rohan', 'Simran', 'Ankit'
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await User.deleteMany({});
    for (const name of users) {
      await User.create({ name });
    }
    console.log('Seeded users successfully');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
