const colors = require('colors');
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...'.cyan)
  } catch (err) {
    console.error(err.message.red);
    process.exit(1);
  }
};

module.exports = connectDB;