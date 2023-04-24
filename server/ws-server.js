'use strict';
let WSServer = require('ws').Server;
let server = require('http').createServer();
let app = require('./http-server');
let connected = false;
const ipc = require('node-ipc');

// Create web socket server on top of a regular http server
let wss = new WSServer({
	server: server,
});

// Also mount the app here
server.on('request', app);

wss.on('connection', function connection(ws) {
	console.log('Client has connected');

	ws.on('message', function incoming(message) {
		let body = JSON.parse(message);

		// Send each message type to its intended handler
		ipc.of.poseControl.emit('bodyData', body);
		connected = true;
	});


	ws.on('close', () => {
		console.log('Client has disconnected');
		connected = false;
	});
});


// This attempts to keep the contact point of the probe stationary as it tilts by moving the XY table to compensate for IJ Movements
// Currently unused due to power constraints (too many motors running at once)
function poseRotation(data) {
	if (xyControlConnection) {
		let xOffset = data.pitch * 0.3;
		let yOffset = data.pitch * 0.3;
		ipc.of.xyControl.emit('tiltOffset', { x: xOffset, y: yOffset });
	}

	if (tendonControlConnection) ipc.of.tendonControl.emit('pitchroll', data);
	else console.log('ijRotation: ', data);
}

// Actually turn on the websocket server
server.listen(8080, function () {
	console.log('http/ws server listening on 8080');
});

// SETUP FOR IPC
ipc.config.id = 'ws-server';
ipc.config.retry = 1500;
ipc.config.silent = true;
//let tendonControlConnection = false;
//let xyControlConnection = false;
//let kzControlConnection = false;
let poseControlConnection = false;


ipc.connectTo('poseControl', function () {
	poseControlConnection = true;
	ipc.of.poseControl.on('connect', function () {
		ipc.log('## connected to poseControl ##'.rainbow, ipc.config.delay);
		ipc.of.poseControl.emit('message', 'hello');
		console.log('ws-server connected to poseControl');
	});
	ipc.of.poseControl.on('disconnect', function () {
		ipc.log('disconnected from world'.notice);
		// console.log('ws-server disconnected from kzControl');
		poseControlConnection = false;
	});
});