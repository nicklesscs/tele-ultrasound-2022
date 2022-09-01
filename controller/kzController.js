'use strict';
var ipc = require('node-ipc');
const MotorController = require(__dirname + '/../motors/motorController');

let kzMotors = new MotorController();

let kMotor = kzMotors.addMotor('k', 25, 7, 8);
let zMotor = kzMotors.addMotor('z', 12, 20, 16);

kMotor.setPosition(0);
zMotor.setPosition(0);

let kPosition = 0;
let zPosition = 0;
let kVel = 0;
let zVel = 0;

process.on('SIGINT', function () {
	if (kzMotors) kzMotors.killAllMotors();
	process.exit();
});

ipc.config.id = 'kzControl';
ipc.config.retry = 1500;
ipc.config.silent = true;

let moveLoop = setInterval(() => {
	// Scaling the k and z velocities and converting to set positions
	kPosition += kVel * 8;
	zPosition += zVel * -8;

	// uncomment this line to impose software limits on how far we can move the probe in the Z direction
	// zPosition = Math.max(0, Math.min(50, zPosition));

	// only set the position if the velocity is non-zero. this eliminates unneeded communication between processes
	if (kVel != 0) {
		kMotor.setPosition(Math.floor(kPosition));
		console.log(kPosition);
	}
	if (zVel != 0) {
		zMotor.setPosition(Math.floor(zPosition));
		console.log(zPosition);
	}
}, 20);

ipc.serve(function () {
	console.log('kzControlller server up');
	ipc.server.on('zVelocity', function (data, socket) {
		zVel = data.z;
	});
	ipc.server.on('kVelocity', function (data, socket) {
		kVel = data.k;
	});
	ipc.server.on('socket.disconnected', function (socket, destroyedSocketID) {
		ipc.log('client ' + destroyedSocketID + ' has disconnected!');
	});
});

ipc.server.start();
