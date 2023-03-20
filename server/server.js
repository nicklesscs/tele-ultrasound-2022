//var http = require('http');
//var fs = require('fs');
//
//const PORT=8080;
//
//fs.readFile('./gui.html', function (err, html) {
//
//    if (err) throw err;
//
//    http.createServer(function(request, response) {
//        response.writeHeader(200, {"Content-Type": "text/html"});
//        response.write(html);
//        response.end();
//    }).listen(PORT,'130.215.175.244');
//});
//
//


const http = require('http');
const fs = require('fs');

const PORT = 8080;
const IP_ADDRESS = '130.215.125.155';

fs.readFile('./index.html', function (err, html) {
  if (err) throw err;

  const server = http.createServer(function(request, response) {
    response.writeHeader(200, {"Content-Type": "text/html"});
    response.write(html);
    response.end();
  });

  server.listen(PORT, IP_ADDRESS, function () {
    console.log(`Server running at http://${IP_ADDRESS}:${PORT}/`);
  });
});
