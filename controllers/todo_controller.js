const express = require('express'),
      router  = express.Router(),
      todo    = require('../models/todo.js');

// Display tasks
router.get('/', function (req, res) {
	todo.selectAll(data => {
		res.render('index', { tasks: data });
	});
});

// Add new task
router.post('/', function (req, res) {
	todo.createTask(req.body, data => res.json(data));
});

// Modify pending task text, or set completed
router.put('/', function (req, res) {
	if (req.body.hasOwnProperty('task')) {
		todo.updateTask(req.body.id, req.body.task, data => res.json(data));

	} else {
		todo.completeTask(req.body.id, data => res.json(data));
	}
});

// Delete pending task
router.delete('/', function (req, res) {
	todo.deleteTask(req.body.id, data => res.json(data));
});

// Delete completed tasks
router.delete('/completed', function (req, res) {
	todo.clearCompleted(data => res.json(data));
});

module.exports = router;
