'use strict';
var ipc = require('node-ipc');
const MotorController = require(__dirname + '/../motors/motorController');
const getTendonLengths = require('../controller/tendonLengths.js');

let tendons = new MotorController();

let tendon1 = tendons.addMotor('t1', 10, 11, 9);
let tendon2 = tendons.addMotor('t2', 5, 13, 6);
let tendon3 = tendons.addMotor('t3', 19, 21, 26);

tendon1.setPosition(0);
tendon2.setPosition(0);
tendon3.setPosition(0);

process.on('SIGINT', function () {
	if (tendons) tendons.killAllMotors();
	process.exit();
});

ipc.config.id = 'tendonControl';
ipc.config.retry = 1500;
ipc.config.silent = true;

let spoolDiameter = 4.9;
let spoolCircum = Math.PI * spoolDiameter;
function distanceToSetpoint(legLength) {
	return (legLength - 54.85) * (200.0 / spoolCircum);
}

ipc.serve(function () {
	console.log('tendonController server up');
	ipc.server.on('pitchroll', function (data, socket) {
		let tendonLengths = getTendonLengths(data.pitch, data.roll);
		console.log(data);
		tendon1.setPosition(Math.floor(distanceToSetpoint(tendonLengths[0])));
		tendon2.setPosition(Math.floor(distanceToSetpoint(tendonLengths[1])));
		tendon3.setPosition(Math.floor(distanceToSetpoint(tendonLengths[2])));
	});
	ipc.server.on('socket.disconnected', function (socket, destroyedSocketID) {
		ipc.log('client ' + destroyedSocketID + ' has disconnected!');
	});
});

ipc.server.start();
