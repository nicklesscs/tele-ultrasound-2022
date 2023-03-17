'use strict';
var ipc = require('node-ipc');
const MotorController = require(__dirname + '/../motors/motorController');

let xyMotors = new MotorController();

let xMotor = xyMotors.addMotor('x', 17, 22, 27);
let yMotor = xyMotors.addMotor('y', 14, 18, 15);

xMotor.setPosition(0);
yMotor.setPosition(0);

let xPosition = 0;
let yPosition = 0;
let xVel = 0;
let yVel = 0;

let tilting = false;
let tiltStart = { x: 0, y: 0 };

process.on('SIGINT', function () {
	if (xyMotors) xyMotors.killAllMotors();
	process.exit();
});

ipc.config.id = 'xyControl';
ipc.config.retry = 1500;
ipc.config.silent = true;

let sprocketDiameter = 12.22;
let sprocketCircum = Math.PI * sprocketDiameter;
function positionToSetpoint(position) {
	return position * (400.0 / sprocketCircum);
}

let moveLoop = setInterval(() => {
	xPosition += xVel * -1;
	yPosition += yVel * -1;
	xPosition = Math.max(0, Math.min(50, xPosition));
	yPosition = Math.max(0, Math.min(50, yPosition));
	if (xVel != 0 || tilting) {
		xMotor.setPosition(Math.floor(positionToSetpoint(xPosition)));
		//console.log('x: ', xPosition);
		//console.log(Math.floor(positionToSetpoint(xPosition)));
	}
	if (yVel != 0 || tilting) {
		yMotor.setPosition(Math.floor(positionToSetpoint(yPosition)));
		//console.log('y: ', yPosition);
	}
}, 20);

ipc.serve(function () {
	console.log('xyController server up');
	ipc.server.on('xyVelocity', function (data, socket) {
		tilting = false;
		console.log(data);
		xVel = data.y;
		yVel = data.x;
	});

	ipc.server.on('tiltOffset', function (data, socket) {
		console.log(data);
		if (tilting == false) {
			tiltStart = { x: xPosition + data.x, y: yPosition + data.y };
			tilting = true;
		}
		xPosition = tiltStart.x + data.x;
		yPosition = tiltStart.y + data.y;
	});
	ipc.server.on('socket.disconnected', function (socket, destroyedSocketID) {
		ipc.log('client ' + destroyedSocketID + ' has disconnected!');
	});
});

ipc.server.start();
