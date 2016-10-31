const express = require('express'),
      router  = express.Router(),
      todo    = require('../models/todo.js');

router.get('/', function (req, res) {
	todo.all(data => {
		data.map(item => item.isComplete = !!item.isComplete);
		res.render('index', { tasks: data });
	});
});

module.exports = router;
