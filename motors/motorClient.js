'use strict';
var ipc = require('node-ipc');
var motorID = process.argv[2];
ipc.config.id = motorID + 'driver';
ipc.config.retry = 1500;
ipc.config.silent = true;

let MotorDriver = require(__dirname + '/motorDriver');
let motor;

ipc.connectTo(motorID, () => {
	ipc.of[motorID].on('connect', () => {
		ipc.log('## connected to ' + motorID + ' ##'.debug);
		ipc.of[motorID].emit('handshake', 'hello');
	});
});

ipc.of[motorID].on('init', (data) => {
	motor = new MotorDriver(data.enablePin, data.directionPin, data.stepPin);
	ipc.of[motorID].emit('ready');
});

ipc.of[motorID].on('disconnect', () => {
	ipc.log('disconnected from world'.notice);
});

ipc.of[motorID].on('setPosition', (data) => {
	ipc.log('setting position : '.debug, data);
	motor.setPosition(data.setPoint, data.delay);
});

process.on('SIGINT', function () {
	if (motor) motor.deconstruct();
	process.exit();
});
