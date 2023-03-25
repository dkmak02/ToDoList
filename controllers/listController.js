//const Activity = require('../models/activietiesModel');
const List = require('../models/listModel');
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
exports.getAllLists = catchAsync(async (req, res, next) => {
  const lists = await List.find();
  res.status(200).json({
    status: 'success',
    results: lists.length,
    data: {
      lists,
    },
  });
});
exports.changeListName = catchAsync(async (req, res, next) => {
  const list = await List.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
  });
  if (!list) {
    return next(new AppError('No list with that ID'));
  }
  res.status(200).json({
    status: 'success',
    data: {
      list,
    },
  });
});
