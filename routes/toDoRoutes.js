const express = require('express');

const toDoController = require('../controllers/toDoController');

const router = express.Router();
router.post('/addnew', toDoController.createNewList);
module.exports = router;
