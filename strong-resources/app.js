var http = require('http'),
httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});
proxy.on('error', function (err, req, res) {
	  res.writeHead(500, {
	    'Content-Type': 'text/plain'
	  });

	  res.end('Something went wrong. And we are reporting a custom error message.');
	}); 
//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
var server = http.createServer(function(req, res) {
	if (req.headers.host.indexOf('pm') != -1){
		proxy.web(req, res, { target: 'http://127.0.0.1:8701' });
	}
	else
	{
		proxy.web(req, res, { target: 'http://127.0.0.1:3001' });
	}
});


console.log("listening on port " + process.env.PORT)
server.listen(process.env.PORT);