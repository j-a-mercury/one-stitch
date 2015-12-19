var express = require('express');
var app = express();

app.use(express.static('/'));

var portaroo = process.env.PORT || 3000

var server = app.listen(portaroo, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});
