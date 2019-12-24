const express = require('express');
const router = express.Router();

const stateController = require('../controllers/StateController');

/* GET home page. */
router.get('/', stateController.index);

module.exports = router;