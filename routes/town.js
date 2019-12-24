const express = require('express');
const router = express.Router();

const townController = require('../controllers/TownController');

/* GET home page. */
router.get('/', townController.index);

module.exports = router;