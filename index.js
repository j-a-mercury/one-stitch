var express = require('express');
var app = express();

app.get('*.json', function(req, res) {
	res.sendfile(req.path);
});

app.get('generate.js', function(req, res) {
	var fs = require('fs');
	fs.writeFile('data.json', 'Hey there!', function(err) {
    		if(err) {
        		return console.log(err);
    		}
	});
});

app.get('*', function(req, res) {
	res.sendfile('index.html');
});

var portaroo = process.env.PORT || 3000

var server = app.listen(portaroo, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});
