'use strict';
const WebSocket = require('ws');
const ipc = require('node-ipc');
let connected = false

const ws = new WebSocket('ws://130.215.120.242:8080');

ws.on('open', function open() {
  console.log('Connected to server');
});

ws.on('message', function incoming(message) {
  try {
    const data = JSON.parse(message);
    if (data.type === 'tf_polhemus') {
       console.log('Received tf_polhemus data:', data);
    }
    // Send tf_polhemus data to poseController via ipc
    ipc.of.newController.emit('messageData', data);
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
//let tendonControlConnection = false;
//let xyControlConnection = false;
//let kzControlCbodyDataonnection = false;
let newControlConnection = false;



ipc.connectTo('newController', function () {
	newControlConnection = true;
	ipc.of.newController.on('connect', function () {
		ipc.log('## connected to newController ##'.rainbow, ipc.config.delay);
		ipc.of.newController.emit('message', 'hello');
		console.log('client connected to newController successfully');
	});
	ipc.of.newController.on('disconnect', function () {
		ipc.log('disconnected from world'.notice);
		console.log('client disconnected from newController');
		newControlConnection = false;
	});
});


