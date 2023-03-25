const express = require('express');

const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const listController = require('../controllers/listController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(listController.getAllLists)
  .post(listController.createNewList);
router
  .route('/:id')
  .patch(listController.changeListName)
  .delete(listController.deleteAnyList);
router.get('/userLists', listController.getAllListsForUser);
router.get('/me', listController.getMyLists, listController.getAllListsForUser);
router.route('/me/:id').delete(listController.deleteMyList);
module.exports = router;
