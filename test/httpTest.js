const http = require('http');

const server = http.createServer((request, response) => {
	let data = [];
	request
		.on('data', (d) => {
			data.push(d);
		})
		.on('end', () => {
			data = Buffer.concat(data).toString();
			response.statusCode = 201;
            console.log(data);
			response.end();
		});
}).listen(8000);
