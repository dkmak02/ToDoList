const express = require('express');

const toDoController = require('../controllers/listController');

const router = express.Router();
router.post('/addnew', toDoController.createNewList);
module.exports = router;
