const conn = require('./connection.js');

const orm = {
	select: function (table, callback) {
		conn.query(`SELECT * FROM ??`, table, function (err, res) {
			if (err) throw err;
			callback(res);
		});
	},

	selectWhere: function (table, col, query, callback) {
		conn.query(`SELECT * FROM ?? WHERE ?? LIKE ?`, [table, col, query], function (err, res) {
			if (err) throw err;
			callback(res);
		});
	},

	join: function (table1, table2, callback) {
		conn.query(`SELECT * FROM ?? JOIN ??`, [table1, table2], function (err, res) {
			if (err) throw err;
			callback(res);
		});
	}
};

module.exports = orm;
