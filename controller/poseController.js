'use strict';
let connected = false;
var ipc = require('node-ipc');

// SETUP FOR IPC
ipc.config.id = 'poseControl';
ipc.config.retry = 1500;
ipc.config.silent = true;
let tendonControlConnection = false;
let xyControlConnection = false;
let kzControlConnection = false;

// Attempt to connect to the tendonController. This will retry (I think every second)
ipc.connectTo('tendonControl', function () {
	tendonControlConnection = true;
	ipc.of.tendonControl.on('connect', function () {
		ipc.log('## connected to tendonControl ##'.rainbow, ipc.config.delay);
		ipc.of.tendonControl.emit('message', 'hello');
		console.log('poseController connected to tendonControl');
	});
	ipc.of.tendonControl.on('disconnect', function () {
		ipc.log('disconnected from world'.notice);
		// console.log('poseController disconnected from tendonControl');
		tendonControlConnection = false;
	});
});

// Attempt to connect to the xyController.
ipc.connectTo('xyControl', function () {
	xyControlConnection = true;
	ipc.of.xyControl.on('connect', function () {
		ipc.log('## connected to xyContol ##'.rainbow, ipc.config.delay);
		ipc.of.xyControl.emit('message', 'hello');
		console.log('poseController connected to xyControl');
	});
	ipc.of.xyControl.on('disconnect', function () {
		ipc.log('disconnected from world'.notice);
		// console.log('poseControl disconnected from xyControl');
		xyControlConnection = false;
	});
});

// Attempt to connect to the kzController.
ipc.connectTo('kzControl', function () {
	kzControlConnection = true;
	ipc.of.kzControl.on('connect', function () {
		ipc.log('## connected to kzControl ##'.rainbow, ipc.config.delay);
		ipc.of.kzControl.emit('message', 'hello');
		console.log('poseController connected to kzControl');
	});
	ipc.of.kzControl.on('disconnect', function () {
		ipc.log('disconnected from world'.notice);
		// console.log('poseControl disconnected from kzControl');
		kzControlConnection = false;
	});
});

ipc.serve(function () {
	console.log('bodyData server up');
	ipc.server.on('bodyData', function (data, socket) {
		let body = data;
		//console.log(body);
		// Send each message type to its intended handler
		switch (body.type) {
			case 'ijRotation':
				ijRotationHandler(body.data);
				//console.log(body.type);
				//console.log('tendonControlConnection: ' + tendonControlConnection);				
				//poseRotation(body.data); // uncomment to rotate the probe around the point of contact (not yet optimized to run smoothly, will be jerky and slow)
				break;
			case 'xyJoystick':
				xyJoystickHandler(body.data);
				//console.log(body.type);
				//console.log('xyControlConnection: ' + xyControlConnection);
				break;
			case 'kJoystick':
				kJoystickHandler(body.data);
				//console.log(body.type);
				//console.log('kzControlConnection: ' +kzControlConnection);
				break;
			case 'zJoystick':
				zJoystickHandler(body.data);
				//console.log(body.type);
				//console.log('kzControlConnection: ' + kzControlConnection);
				break;
			default:
				console.log('message: ', body.type);
				console.log('wrong data type');
				break;
		}
		connected = true;
	});
	ipc.server.on('socket.disconnected', function (socket, destroyedSocketID) {
		ipc.log('client ' + destroyedSocketID + ' has disconnected!');
	});
});

function ijRotationHandler(data) {
	// Checks for a connection to the tendonController
	if (tendonControlConnection) {
		ipc.of.tendonControl.emit('pitchroll', data);
		//console.log('sent to tendonControl');
	} else {
		// If no connection, just log the data
		//console.log('ijRotation: ', data);
		//console.log('not sent to tendonControl');
	}
}

function xyJoystickHandler(data) {
	if (xyControlConnection) {
		ipc.of.xyControl.emit('xyVelocity', data);
		//console.log('sent to xyControl');
	} else {
		//console.log('xyJoystick: ', data);
		//console.log('not sent to xyControl');
	}
}

function kJoystickHandler(data) {
	if (kzControlConnection) {
		ipc.of.kzControl.emit('kVelocity', { k: data.x });
		//console.log('sent to kzControl');
	} else {
		//console.log('kJoystick: ', { k: data.x });
		//console.log('not sent to kzControl');
	}
}

function zJoystickHandler(data) {
	if (kzControlConnection) {
		ipc.of.kzControl.emit('zVelocity', { z: data.y });
		//console.log('sent to kzControl');
	} else {
		//console.log('zJoystick: ', { z: data.y });
		//console.log('not sent to kzControl');
	}
}


// This attempts to keep the contact point of the probe stationary as it tilts by moving the XY table to compensate for IJ Movements
// Currently unused due to power constraints (too many motors running at once)
function poseRotation(data) {
	if (xyControlConnection) {
		let xOffset = data.pitch * 0.7;    //lower power consumption
		let yOffset = data.pitch * 0.7;
		ipc.of.xyControl.emit('tiltOffset', { x: xOffset, y: yOffset });
	}

	if (tendonControlConnection) ipc.of.tendonControl.emit('pitchroll', data);
	else console.log('ijRotation: ', data);
}

ipc.server.start();
