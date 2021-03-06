var exps = require('express');
var app = exps();
var fs = require('fs');

app.use(exps.static(__dirname + '/static'));

app.get('/data.json', function(req, res) {
	fs.readFile('./data.json', function(err) {
		if(err) {
			var dmc = {};
			var sections = {};
			var stitches = [];
			fs.readFile('./static/dmc.json', function(err, dmc_data) {
				if(err) {
					res.send('dmc fail');
				} else {
					dmc = JSON.parse(dmc_data);
					fs.readFile('./static/sections.json', function(err, section_data) {
						if(err) {
							res.send('sections fail');
						} else {
							sections = JSON.parse(section_data);
							fs.readFile('./static/stitches.json', function(err, stitch_data) {
								if(err) {
									res.send('stitches fail');
								} else {
									stitches = JSON.parse(stitch_data);
									var data = [];
									var sanity = [];
									stitches.forEach(function(v) {
										var key = v.section + '-' + v.x + '-' + v.y;
										if(-1 != sanity.indexOf(key)) {
											res.send('duplicate fail' + key);
										} else {
											sanity.push(key);
										}
										var stitch = {"type":"rect","width":10,"height":10,"stroke_width":0,"opacity":0,"x":0,"y":0,"fill":"#"};
										stitch.x = (sections[v.section].offset_x + v.x) * 10;
										stitch.y = (sections[v.section].offset_y + v.y) * 10;
										var red = dmc[v.dmc].red.toString(16).toUpperCase();
										var green = dmc[v.dmc].green.toString(16).toUpperCase();
										var blue = dmc[v.dmc].blue.toString(16).toUpperCase();
										stitch.fill = '#' + (1 === red.length ? 0 + red : red) + (1 === green.length ? 0 + green : green) + (1 === blue.length ? 0 + blue : blue);
										data.push(stitch);
									});
									data = 'var stitches = ' + JSON.stringify(data);
									fs.writeFile('./data.json', data, function(err) {
										if(err) {
											res.send('write fail' + data);
										} else {
											res.sendFile(__dirname + '/data.json');
										}
									});
								}
							});
						}
					});
				}
			});
		} else {
			res.sendFile(__dirname + '/data.json');
		}
	});
});

app.get('*', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

var portaroo = process.env.PORT || 3000;

var server = app.listen(portaroo, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('App listening at http://%s:%s', host, port);
});
