const orm = require('../config/orm.js');

const todo = {
	all: function (callback) {
		orm.select('tasks', res => callback(res));
	}
};

module.exports = todo;
