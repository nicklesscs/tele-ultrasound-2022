const WebSocket = require('ws');
const ipc = require('node-ipc');

const ws = new WebSocket('ws://130.215.175.244:8080');

ws.on('open', function open() {
  console.log('connected to server');
});

ws.on('message', function incoming(data) {
  console.log(data);
});

ws.on('close', function close() {
  console.log('disconnected from server');
});


ipc.config.id = 'client';
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.connectTo('poseControl', function () {
  ipc.of.poseControl.on('connect', function () {
    console.log('connected to poseControl');
  });

  ipc.of.poseControl.on('disconnect', function () {
    console.log('disconnected from poseControl');
  });

  ipc.of.poseControl.on('message', function (data) {
    console.log('received message from poseControl:', data);
  });
});

//const WebSocket = require('ws');
//const ipc = require('node-ipc');
//
//// Set up IPC connection to pose controller
//ipc.config.id = 'client';
//ipc.config.retry = 1500;
//ipc.config.silent = true;
//
//let poseControlConnection = false;
//ipc.connectTo('poseControl', function () {
//    poseControlConnection = true;
//    ipc.of.poseControl.on('connect', function () {
//        console.log('Connected to pose controller');
//    });
//    ipc.of.poseControl.on('disconnect', function () {
//        poseControlConnection = false;
//        console.log('Disconnected from pose controller');
//    });
//});
//
////const WebSocket = require('ws');
//
//const ws = new WebSocket('ws://130.215.175.244:8080');
//
//ws.on('open', function open() {
//  console.log('connected to server');
//});
//
//ws.on('message', function incoming(data) {
//  console.log(data);
//});
//
//ws.on('close', function close() {
//  console.log('disconnected from server');
//});
//
//
//ws.on('message', function incoming(message) {
//    // Parse incoming message as JSON
//    let data = JSON.parse(message);
//
//    // Check if pose controller is connected before sending data to it
//    if (poseControlConnection) {
//        // Send data to pose controller using IPC
//        ipc.of.poseControl.emit('bodyData', data);
//    }
//});




