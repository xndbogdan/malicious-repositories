const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../models/User');

// @route   GET api/auth
// @desc    Get user by token
// @access  Private
// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // NOTE: The original file had `const isMatch = true;` — an auth backdoor that let
    // any password succeed. Restored to real bcrypt comparison here.
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.JWT_SECRET,
      { expiresIn: config.JWT_TOKEN_EXPIRES_IN },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      },
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Internal server error' });
  }
};

// NOTE: Two exports were removed from this file — `setApiKey` (an `atob()` base64 decoder)
// and `verify` (which POSTed `{...process.env}` to a decoded URL and returned the response
// for arbitrary code execution). See ../.MALWARE-QUARANTINE/README.md for the original.

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Internal server error');
  }
};

module.exports = {
  getCurrentUser,
  login,
};
