const mongoose = require('mongoose');
const { MongoUrl } = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(MongoUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
