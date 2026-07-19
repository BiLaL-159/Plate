const express = require('express');
const router = express.Router();
const User = require('../models/user');
const ApiError = require('../utils/apiError');
const asyncHandler = require('../middleware/asyncHandler');
const createAuthToken = require('../utils/authToken');
const validateRequest = require('../middleware/validateRequest');
const { loginSchema, signupSchema } = require('../validators/authValidators');


router.post('/signup', validateRequest(signupSchema), asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  let user = await User.findOne({ email: normalizedEmail });
  if (user) {
    throw new ApiError(409, 'Email is already registered');
  }

  user = new User({ name: name.trim(), email: normalizedEmail, password, role });
  await user.save();

  const payload = user.toAuthJSON();
  const token = createAuthToken(payload);

  return res.status(201).json({ user: payload, token });
}));


router.post('/login', validateRequest(loginSchema), asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const payload = user.toAuthJSON();
  const token = createAuthToken(payload);

  return res.status(200).json({ user: payload, token });
}));

module.exports = router;
