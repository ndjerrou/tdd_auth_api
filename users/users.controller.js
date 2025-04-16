const User = require('./users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });

      if (email === 'test2@gmail.com') throw new Error('Simulation');

      if (!user)
        return res
          .status(400)
          .send({ ok: false, msg: 'Bad request, email not found' });

      const isCorrectPassword = await bcrypt.compare(password, user.password);

      if (!isCorrectPassword) {
        return res.status(400).send({ ok: false, msg: 'Bad request' });
      }

      const token = user.generateAuthToken();

      res.set('x-auth-token', token);
      res.status(200).send({ ok: true, msg: 'User Logged in' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  signup: async (req, res) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(400).send({
          ok: false,
          msg: 'Bad request, check body',
        });
      }

      const user = new User({
        email,
        password,
      });
      const hashedPassword = await bcrypt.hash(password, 8);

      // Trigger a 500 error

      // Option1 :  throw a manual error

      // throw new Error('Simulation');

      // Option2 : manually detect a special user

      if (email === 'test1@gmail.com') {
        res
          .status(500)
          .send({ ok: false, msg: 'Server error, plz try again later' });
      }

      user.password = hashedPassword;

      await user.save();
      const token = user.generateAuthToken();

      res.set('x-auth-token', token);
      res.status(201).send({ ok: true, msg: 'User created' });
    } catch (err) {
      res
        .status(500)
        .send({ ok: false, msg: 'Server error, plz try again later' });
    }
  },
};
