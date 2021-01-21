const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route       POST api/posts
// @desc        Create a post
// @access      Private
router.post(
  '/',
  [auth, [check('text', 'טקסט הינו שדה חובה.').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error('💥 ' + err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route       GET api/posts
// @desc        Get all posts
// @access      Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

// @route       GET api/posts/:id
// @desc        Get post by ID
// @access      Private
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'הפוסט לא נמצא.' });

    res.json(post);
  } catch (err) {
    console.error('💥 ' + err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'הפוסט לא נמצא.' });
    res.status(500).send('Server error');
  }
});

// @route       DELETE api/posts/:id
// @desc        Delete a post
// @access      Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ msg: 'הפוסט לא נמצא.' });

    // Check user
    if (post.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'אין הרשאה.' });

    await post.remove();

    res.json({ msg: 'הפוסט הוסר.' });
  } catch (err) {
    console.error('💥 ' + err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ msg: 'הפוסט לא נמצא.' });
    res.status(500).send('Server error');
  }
});

// @route       PUT api/posts/like/:id
// @desc        Like a post
// @access      Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length > 0
    )
      return res.status(400).json({ msg: 'הפוסט כבר קיבל ממך לייק.' });

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

// @route       PUT api/posts/unlike/:id
// @desc        Unlike a post
// @access      Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked
    if (
      post.likes.filter(like => like.user.toString() === req.user.id).length ===
      0
    )
      return res.status(400).json({ msg: 'הפוסט לא קיבל ממך לייק.' });

    // Get remove index
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

// @route       POST api/posts/comment/:id
// @desc        Comment on a post
// @access      Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'טקסט הינו שדה חובה.').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error('💥 ' + err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route       PUT api/posts/comment/:id/:comment_id
// @desc        Edit a Comment
// @access      Private
router.put('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);

    // Pull out comment
    let comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) return res.status(404).json({ msg: 'התגובה לא נמצאה.' });

    // Make sure if the user editing the comment is the owner of the comment
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'אין הרשאה.' });

    const editedComment = {
      'comments.$.text': req.body.text,
      'comments.$.editedAt': new Date(),
    };

    post = await Post.findOneAndUpdate(
      {
        _id: req.params.id,
        'comments._id': req.params.comment_id,
      },
      {
        $set: editedComment,
      },
      { new: true }
    );

    res.json(post.comments);
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

// @route       DELETE api/posts/comment/:id/:comment_id
// @desc        Delete a Comment
// @access      Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // Make sure comment exists
    if (!comment) return res.status(404).json({ msg: 'התגובה לא נמצאה.' });

    // Make sure if the user deleting the comment is the owner of the comment
    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'אין הרשאה.' });

    // Get remove index
    const removeIndex = post.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error('💥 ' + err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
