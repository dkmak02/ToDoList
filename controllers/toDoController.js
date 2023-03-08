const ToDo = require('./../models/toDoModel');
const List = require('./../models/listModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createNewList = catchAsync(async (req, res, next) => {
  const newList = await List.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      list: newList,
    },
  });
});
exports.addActivityToList = catchAsync(async (req, res, next) => {
  const newList = await List.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      list: newList,
    },
  });
});
