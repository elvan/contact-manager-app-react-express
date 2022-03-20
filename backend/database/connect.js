const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const MONGODB_URL =
  process.env.MONGODB_URL || 'mongodb://localhost:27017/contact-manager-app';

const connectToDatabase = async () => {
  try {
    const defaultConnection = await mongoose.connect(MONGODB_URL, {});
    console.log(
      `Connected to MongoDB server at ${defaultConnection.connection.host}`
    );
  } catch (error) {
    console.log(`Error connecting to MongoDB server: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
