const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const activietiesRouter = require('./routes/toDoRoutes');
const listRouter = require('./routes/listRoutes');
const errorHandling = require('./controllers/errorController');

const app = express();

//Using morgan in dev mode change that later
app.use(cors());
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
app.use('/api/v1/lists', listRouter);
app.use('/api/v1/activities', activietiesRouter);
app.use(errorHandling);
module.exports = app;
