const express = require('express');

// call router
const router = express.Router();
const likesController = require('../controllers/likes_controller');

router.post('/toggle', likesController.toggleLike);

module.exports = router;