const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route       GET api/profile/me
// @desc        Get current user's profile
// @access      Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'אין פרופיל המקושר למשתמש זה' });
    }

    res.json(profile);
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server Error');
  }
});

// @route       POST api/profile
// @desc        Create or update user's profile
// @access      Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'סטטוס הינו שדה חובה').not().isEmpty(),
      check('skills', 'כישורים הינו שדה חובה').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.youtube = youtube;
    if (twitter) profileFields.twitter = twitter;
    if (facebook) profileFields.facebook = facebook;
    if (linkedin) profileFields.linkedin = linkedin;
    if (instagram) profileFields.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create new profile
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error('💥 ' + err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route       GET api/profile
// @desc        Get all profiles
// @access      Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

// @route       GET api/profile/user/:user_id
// @desc        Get profile by user ID
// @access      Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) return res.status(400).json({ msg: 'הפרופיל לא נמצא' });

    res.json(profile);
  } catch (err) {
    console.error('💥 ' + err.message);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ msg: 'הפרופיל לא נמצא' });
    res.status(500).send('Server error');
  }
});

// @route       DELETE api/profile
// @desc        Delete profile, user & posts
// @access      Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // Remove the user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'המשתמש הוסר' });
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

// @route       PUT api/profile/experience
// @desc        Add profile experience
// @access      Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'כותרת הינה שדה חובה').not().isEmpty(),
      check('company', 'חברה הינה שדה חובה').not().isEmpty(),
      check('from', 'תאריך התחלה הינו שדה חובה').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error('💥 ' + err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route       DELETE api/profile/experience/:exp_id
// @desc        Delete experience from profile
// @access      Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

// @route       PUT api/profile/education
// @desc        Add profile education
// @access      Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'מוסד לימודים הינו שדה חובה').not().isEmpty(),
      check('degree', 'תואר/תעודה הינה שדה חובה').not().isEmpty(),
      check('fieldofstudy', 'תחום לימודים הינו שדה חובה').not().isEmpty(),
      check('from', 'תאריך התחלה הינו שדה חובה').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error('💥 ' + err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route       DELETE api/profile/education/:edu_id
// @desc        Delete education from profile
// @access      Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

// @route       GET api/profile/github/:username
// @desc        Get user's repos from Github
// @access      Public
router.get('/github/:username', async (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=updated:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    };

    request(options, (error, response, body) => {
      if (error) console.error('💥 ' + error);

      if (response.statusCode !== 200)
        return res.status(404).json({ msg: 'לא נמצא פרופיל גיטהאב' });

      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
