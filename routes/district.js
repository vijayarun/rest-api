const express = require('express');
const router = express.Router();

const districtController = require('../controllers/DistrictController');

/* GET home page. */
router.get('/', districtController.index);

module.exports = router;