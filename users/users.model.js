const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { required: true, type: String },
  password: { required: true, type: String },
});

const User = mongoose.model('user', userSchema);

userSchema.methods.generateAuthToken = function () {
  let token = null;

  jwt.sign(
    { id: user._id },
    process.env.JWT_PRIVATEKEY,
    (err, generatedToken) => {
      token = generatedToken;
    }
  );
  return token;
};

module.exports = User;
