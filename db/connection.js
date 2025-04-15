const mongoose = require('mongoose');

const connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017');

    console.log('Connected to MongoDB');
  } catch (err) {
    console.err('PB connection DB');
  }
};

module.exports = connect;
