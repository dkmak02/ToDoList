const express = require('express');

const authController = require('../controllers/authController');
//const userController = require('../controllers/userController');
const listController = require('../controllers/listController');
const activityRouter = require('./toDoRoutes');

const router = express.Router();
router.use('/:listId/activities', activityRouter);
router.use(authController.protect);

router
  .route('/')
  .get(listController.getAllLists)
  .post(listController.createNewList);
router.get('/me', listController.getMyLists, listController.getAllListsForUser);
router.route('/me/:id').delete(listController.deleteMyList);
router.route('/userLists/:id').get(listController.getAllListsForUser);
router
  .route('/:id')
  .patch(listController.changeListName)
  .delete(listController.deleteAnyList)
  .get(listController.getList);
module.exports = router;
