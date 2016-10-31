'use strict';

// Express vars
const express    = require('express'),
      exphbs     = require('express-handlebars'),

      routes     = require('./controllers/todo_controller.js'),

      app        = express(),
      hbs        = exphbs.create({ defaultLayout: 'main', extname: '.hbs' }),
      PORT       = 3000;

// Handlebars init
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');
// app.enable('view cache');

// Static route
app.use(express.static(process.cwd() + '/public'));

// Controller routes
app.use('/', routes);

// Init server
app.listen(process.env.PORT || PORT, function () {
	console.log(`App listening on port ${PORT}`);
});
