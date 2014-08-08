var app = require('express')(),
	http = require('http'),
	querystring= require('querystring');

app.post('/upload', function(req, res){
	var data = '';

	req.on('data', function(data){
		data += data;
	});

	req.on('end', function(){
		var post = http.request({
			host: 'test.mlst.net',
			path: '/epicollectplusbeta/Uganda_cov2014',
			method : 'POST',
		}, function(prox_response)
			{
				console.log('piping back');
				res.end('ttt');
			}
		);

		post.on('error', function(e){
			console.log(e);
			res.end();
		})
	})

});

app.get('/upload', function(req, res){
	var post_req = http.request({
		host: 'test.mlst.net',
		path: '/epicollectplusbeta/Uganda_cov2014/upload',
		method : 'POST',
		port: 80,
		headers: {
			'Content-Length' : data.length,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}, function(prox_response)
		{
			console.log('response');

			//prox_response.pipe(res);
			res.end();
		}
	);

	post_req.on('error', function(e){
		console.log(e);
		res.end();
	})

	post_req.write('data\n');
	post_req.end();

});


module.exports = app;
