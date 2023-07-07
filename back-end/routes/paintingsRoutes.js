const express = require('express');
const router = express.Router();
const PaintingsController = require('../controller/PaintingsController');

router.get('/getPaintings',  PaintingsController.getPaintings);
module.exports = router;
