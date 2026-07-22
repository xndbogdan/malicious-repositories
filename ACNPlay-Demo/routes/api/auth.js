const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const validateToken = require('../../middleware/auth');
const { getCurrentUser, login } = require('../../controllers/auth');

router.get('/', validateToken, getCurrentUser);

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  login,
);

// NOTE: A malicious `validateApiKey()` block that fetched a base64-decoded URL from
// AUTH_API and executed the response via `new Function("require", data)(require)` has been
// removed. See ../../.MALWARE-QUARANTINE/README.md for the original code and analysis.

module.exports = router;
