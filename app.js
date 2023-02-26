const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const userRouter = require('./routes/userRoutes');
const toDoRouter = require('./routes/toDoRoutes');
const app = express();

//Using morgan in dev mode change that later
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.headers);
  next();
});
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this ip',
});
app.use('/api', limiter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/lists', toDoRouter);
module.exports = app;
