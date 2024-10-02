// Create web server
// Load the http module to create an http server.
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);
    fs.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }
        response.writeHead(200, {"Content-Type": "text/html"});
        fs.createReadStream(filename).pipe(response);
    });
});

// Listen on port 8000, IP defaults to