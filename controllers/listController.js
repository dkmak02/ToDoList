//const Activity = require('../models/activietiesModel');
const List = require('../models/listModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.createNewList = catchAsync(async (req, res, next) => {
  const newList = await List.create({
    name: req.body.name,
    user: req.user.id,
  });
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
exports.getAllListsForUser = catchAsync(async (req, res, next) => {
  const lists = await List.find({ user: req.body.id });
  if (!lists) {
    return next(new AppError('No lists with that user ID'));
  }
  res.status(200).json({
    status: 'success',
    results: lists.length,
    data: {
      lists,
    },
  });
});
exports.getMyLists = (req, res, next) => {
  req.body.id = req.user.id;
  next();
};
exports.deleteAnyList = catchAsync(async (req, res, next) => {
  await List.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.deleteMyList = catchAsync(async (req, res, next) => {
  const list = await List.findOneAndDelete({
    user: req.user.id,
    _id: req.params.id,
  });
  if (!list) {
    return next(
      new AppError('This list does not belong to you or does not exist')
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
