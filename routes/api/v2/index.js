const express = require('express');

const router = express.Router();

router.use('/posts', require('./posts2'));

module.exports = router;