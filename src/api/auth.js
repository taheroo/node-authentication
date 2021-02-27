const express = require('express');

const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');

// Create user account
router.post('/auth/', async (req, res) => {
  try {
    const userIsExist = (await User.exists({ email: req.body.email })) || null;
    if (userIsExist) {
      return res.status(409).send({ error: 'User is already registered' });
    }

    const user = new User({
      ...req.body,
    });

    await user.save();
    const token = await user.generateAuthToken();

    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .status(201)
      .send({ token });
  } catch (e) {
    console.error(e);
    res.status(500).send();
  }
});

router.post('/auth/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .status(200)
      .send({ token });
  } catch (e) {
    res.status(e.code || 400).send({ error: e.message });
  }
});

router.post('/auth/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      (token) => token.token !== req.token
    );
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// Logout from all devices
router.post('/auth/logoutall', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// Read connected user
router.get('/auth/me', auth, async (req, res) => {
  try {
    res
      .status(200)
      .send({ email: req.user.email, fullname: req.user.fullname });
  } catch (e) {
    res.status(500).send();
  }
});

// Update connected user
router.patch('/auth/me', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['email', 'fullname', 'password'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    const token = await req.user.generateAuthToken();
    res
      .header('x-auth-token', token)
      .header('access-control-expose-headers', 'x-auth-token')
      .status(200)
      .send({ token });
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
