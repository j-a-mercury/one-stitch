var express = require('express');
var app = express();

app.use(express.static(__dirname + '/json'));

app.get('/generate.js', function(req, res) {
	var fs = require('fs');
	var dmc = {}
	var sections = {}
	var stitches = []
	fs.readFile('./json/dmc.json'), function(err, data) {
/*		if(err) {
			res.send('dmc fail');
		} else {
			dmc = JSON.parse(data);
			console.log(dmc);
			fs.readFile('./json/sections.json', function(err, data) {
				if(err) {
					res.send('sections fail');
				} else {
					sections = JSON.parse(data);
					console.log(sections);
					fs.readFile('./json/stitches.json', function(err, data) {
						if(err) {
							res.send('stitches fail');
						} else {
							stitches = JSON.parse(data);
							console.log(stitches);
							var data = [];
							var pad = 000;
							stitches.forEach(function(k, v) {
								var new = {"type":"rect","width":10,"height":10,"stroke_width":0,"opacity":0,"x":0,"y":0,"fill":"#"};
								new['x'] = (sections[v.section]['offset_x'] + v.x) * 10;
								new['y'] = (sections[v.section]['offset_y'] + v.y) * 10;
								var red = dmc[v.dmc]['red'].toString(16).toUpperCase();
								var green = dmc[v.dmc]['green'].toString(16).toUpperCase();
								var blue = dmc[v.dmc]['blue'].toString(16).toUpperCase();
								new['fill'] = '#' + (1 == red.length ? 0 + red : red) + (1 == green.length ? 0 + green : green) + (1 == blue.length ? 0 + blue : blue);
								data.push(new);
							});
							data = 'var stitches = ' + JSON.stringify(data);
							fs.writeFile('./json/data.json', data, function(err) {
								if(err) {
									res.send('write fail' + data);
								} else {
									res.send('success' + data);
								}
							});
						}
					});
				}
			});
		}
*/	});
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
