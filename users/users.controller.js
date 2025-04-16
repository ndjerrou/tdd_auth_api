const User = require('./users.model');
const bcrypt = require('bcryptjs');

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

      res.status(200).send('abcckckck');
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

      res.status(201).send('sqokslkqsokqosoqk');
    } catch (err) {
      res
        .status(500)
        .send({ ok: false, msg: 'Server error, plz try again later' });
    }
  },
};
