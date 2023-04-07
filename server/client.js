'use strict';
const WebSocket = require('ws');
const ipc = require('node-ipc');
let connected = false

const ws = new WebSocket('ws://130.215.213.241:8080');

ws.on('open', function open() {
  console.log('Connected to server');
});

ws.on('message', function incoming(message) {
  try {
    const data = JSON.parse(message);
    if (data.type === 'tf_polhemus') {
       console.log('Received tf_polhemus data:', data);
    }
    // Send tf_polhemus data to controllers via ipc
    ipc.of.kzController.emit('messageData', data);
    ipc.of.xyController.emit('messageData', data);
    ipc.of.tendonController.emit('messageData', data);
    connected = true;
  } catch (error) {
    console.error(`Error parsing message: ${error}`);
    
  }
});

ws.on('close', function close() {
  console.log('Disconnected from server');
  connected = false;
  setTimeout(() => {
    console.log('Reconnecting to server...');
    ws.connect();
  }, 2000);
});

ws.on('error', function error(error) {
  console.error(`WebSocket error: ${error}`);
});

// SETUP FOR IPC
ipc.config.id = 'client';
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
		console.log('Client connected to tendonControl');
	});
	ipc.of.tendonControl.on('disconnect', function () {
		ipc.log('disconnected from world'.notice);
		// console.log('Client disconnected from tendonControl');
		tendonControlConnection = false;
	});
});

// Attempt to connect to the xyController.
ipc.connectTo('xyControl', function () {
	xyControlConnection = true;
	ipc.of.xyControl.on('connect', function () {
		ipc.log('## connected to xyContol ##'.rainbow, ipc.config.delay);
		ipc.of.xyControl.emit('message', 'hello');
		console.log('Client connected to xyControl');
	});
	ipc.of.xyControl.on('disconnect', function () {
		ipc.log('disconnected from world'.notice);
		// console.log('Client disconnected from xyControl');
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

//need to change the function:
// 1. extract x,y,z data and rotation data from tf_polhmus data
// 2. modify the data to the previous format
// 3. send data to the correct controller.

ipc.serve(function () {
	console.log('messageData server up');
	ipc.server.on('messageData', function (data, socket) {
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


//handle the data here
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

