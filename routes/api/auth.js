const { profile_url } = require('gravatar');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route       GET api/auth
// @desc        Get logged in user
// @access      Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

// @route       POST api/auth
// @desc        Authenticate user and get token
// @access      Public
router.post(
  '/',
  body('email', `נא להזין כתובת דואר אלקטרוני תקנית`).isEmail(),
  body('password', 'סיסמה הינה שדה חובה').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'הפרטים שהוזנו אינם תקינים' }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'הפרטים שהוזנו אינם תקינים' }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, config.get('jwtSecret'), (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error('💥 ' + err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
