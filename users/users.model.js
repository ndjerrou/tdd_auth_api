const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: { required: true, type: String },
  password: { required: true, type: String },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWT_PRIVATEKEY);
  console.log('🚀 ~ token:', token);
  return token;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
