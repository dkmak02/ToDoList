const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
//Sending token
const singToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });

//Registering new user
exports.singUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  const token = singToken(newUser._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});
exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next();
  }
  const user = await User.findOne({ email: email }).select('+password');
  if (!user || !user.correctPassword(password, user.password)) {
    return next();
  }
  const token = singToken(user._id);
  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
});
