const WebSocket = require('ws');
const ipc = require('node-ipc');
const ws = new WebSocket('ws://130.215.175.244:8080');

ws.on('open', function open() {
  console.log('connected to server');
  ws.send("client connected from afar");
});

ws.onmessage = (event) => {
  console.log(event.data);
};

// ws.on('message', function incoming(message) {
//   // Parse incoming message as JSON
//   let data = JSON.parse(message);

//   // Check if pose controller is connected before sending data to it
//   if (poseControlConnection) {
//       // Send data to pose controller using IPC
//       ipc.of.poseControl.emit('bodyData', data);
//   }
// });

ws.on('close', function close() {
  console.log('disconnected from server');
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
		console.log('ws-server disconnected from kzControl');
		poseControlConnection = false;
	});
});





