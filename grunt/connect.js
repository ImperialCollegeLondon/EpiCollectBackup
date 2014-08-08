module.exports = function(grunt, options){

	var restSupport = require('connect-rest');
	   restSupport.post( { path: '/upload'}, function(req, content, next){
		   next(null, {result: 'OK'});
		});
	return {
		server:{
			options:{
				base: 'app',
				livereload: 35729,
		        middleware: function (connect, options) {
		             var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
		             return [
		                // Include the proxy first
						//restSupport.rester( {'context': '/upload'} ),
		                proxy,
		                // Serve static files.
		                connect.static('app'),
		                // Make empty directories browsable.
		                connect.directory('app'),

		             ];
		        }
			},
		    proxies: [
		        {
		            context : '/upload',
		            host: 'localhost',
					port: 3000
		        }
		    ]

		}

	}
}
