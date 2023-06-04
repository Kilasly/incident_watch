const express = require('express');
const addAccident = require('../controllers/accidentController');
const router = express.Router();


router.post('/Accidents', addAccident);

module.exports = router;