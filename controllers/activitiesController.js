const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Activieties = require('../models/activietiesModel');

exports.getAllActivieties = catchAsync(async (req, res, next) => {
  let filterObj = {};
  if (req.params.listId) filterObj = { list: req.params.listId };
  const activieties = await Activieties.find(filterObj);
  res.status(200).json({
    status: 'success',
    results: activieties.length,
    data: {
      activieties,
    },
  });
});
exports.createNewActivieties = catchAsync(async (req, res, next) => {
  const newActivieties = await Activieties.create({
    activity: req.body.activity,
    list: req.params.listId,
    user: req.user.id,
  });
  res.status(201).json({
    status: 'success',
    data: {
      activieties: newActivieties,
    },
  });
});
exports.markAsDone = catchAsync(async (req, res, next) => {
  const activieties = await Activieties.findByIdAndUpdate(req.params.id, {
    completed: true,
    completedAt: Date.now(),
  });
  if (!activieties) {
    return next(new AppError('No activieties with that ID'));
  }
  res.status(200).json({
    status: 'success',
    data: {
      activieties,
    },
  });
});
exports.deleteActivieties = catchAsync(async (req, res, next) => {
  await Activieties.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
exports.getActivity = catchAsync(async (req, res, next) => {
  const activieties = await Activieties.findById(req.params.id);
  if (!activieties) {
    return next(new AppError('No activieties with that ID'));
  }
  res.status(200).json({
    status: 'success',
    data: {
      activieties,
    },
  });
});
