const express = require('express');

const activietiesC = require('../controllers/activitiesController');
const authController = require('../controllers/authController');

const router = express.Router({
  mergeParams: true,
});
router.use(authController.protect);
router
  .route('/')
  .get(activietiesC.getAllActivieties)
  .post(activietiesC.createNewActivieties);
router
  .route('/:id')
  .patch(activietiesC.markAsDone)
  .get(activietiesC.getActivity)
  .delete(activietiesC.deleteActivieties);
module.exports = router;
