var static = require('node-static');
var fs = require('fs');

var staticServer = new static.Server('./public');

var router = function(request, response) {

  if(request.url === "/") {
    staticServer.serveFile('/index.html', 200, {}, request, response);
  } else {
    var url = request.url;
    console.log(url);
    fs.readFile("." + url, {encoding: 'utf8'}, function(err, data) {
      response.writeHead(200, {'Content-Type': 'text/html'});
      if (err) {
        console.log(err);
        response.write('Not Found');
        response.end();
      } else {
        console.log(data)
        response.write(data);
        response.end();
      }
    });
  }
};

module.exports.router = router;
module.exports.staticServer = staticServer;