const express = require('express'),
      router  = express.Router(),
      todo    = require('../models/todo.js');

router.get('/', function (req, res) {
	res.render('index');
});

module.exports = router;
