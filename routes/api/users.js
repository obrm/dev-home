const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');
const normalize = require('normalize-url');

// Bring in User model
const User = require('../../models/User');

// @route       POST api/user
// @desc        Register user
// @access      Public
router.post(
  '/',
  body('name', 'שם הינו שדה חובה').not().isEmpty(),
  body('email', `נא להזין כתובת דואר אלקטרוני תקנית`).isEmail(),
  body('gender', `מגדר הינו שדה חובה`).not().isEmpty(),
  body(
    'password',
    'נא להזין סיסמה עם 6 או יותר תווים, לפחות אות קטנה אחת, אות גדולה אחת, מספר אחד ותו מיוחד'
  ).matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    'i'
  ),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, gender } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ errors: [{ msg: 'המשתמש קיים' }] });
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        }),
        { forceHttps: true }
      );

      user = new User({
        name,
        email,
        avatar,
        password,
        gender,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error('💥 ' + err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
