var config = require('./server-config'),
	express = require('express'),
	app = express(),
	server = require('http').createServer(app);

// Use Express to serve
app.use(express.static(config.static_site_root));

// Run Server
server.listen(config.port, function() {
	console.log("** Express server listening on port : %d **", config.port);
})