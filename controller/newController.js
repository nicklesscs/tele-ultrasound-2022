'use strict';
var ipc = require('node-ipc');
const MotorController = require(__dirname + '/../motors/motorController');
const getTendonLengths = require('../controller/tendonLengths.js');

var Polhemus = require(__dirname + '/../server/client')     ///might be this or the one below
// const {Viper} = require('./client.js');                     //might need to be a set datapoint

//connect the kz motors
let kzMotors = new MotorController();

let kMotor = kzMotors.addMotor('k', 25, 7, 8);              //set up motors
let zMotor = kzMotors.addMotor('z', 12, 20, 16);

kMotor.setPosition(0);
zMotor.setPosition(0);

//set kz equal to zero
let kPosition = 0;
let zPosition = 0;
let kVel = 0;
let zVel = 0;

process.on('SIGINT', function () {                        //set the kz motors equal to zero
	if (kzMotors) kzMotors.killAllMotors();
	process.exit();
});

//connect xy motors
let xyMotors = new MotorController();

let xMotor = xyMotors.addMotor('x', 17, 22, 27);
let yMotor = xyMotors.addMotor('y', 14, 18, 15);

xMotor.setPosition(0);
yMotor.setPosition(0);

process.on('SIGINT', function () {                               //set the xy motors equal to zero to stop movement
	if (xyMotors) kzMotors.killAllMotors();
	process.exit();
});


//set xy equal to zero
let xPosition = 0;
let yPosition = 0;
let xVel = 0;
let yVel = 0;

let tilting = false;
let tiltStart = { x: 0, y: 0 };

//start the tendon coltroller part
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

ipc.serve(function () {                                          //ipc for the tendons
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


//ipc.server.start();    //i dont know if we need this
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// //partition the data into readable chunks

// xdirection = Viper.position.data.x;           //might work
// ydirection = Viper.position.data.y;
// zdirection = Viper.position.data.z;
// pitch = Viper.orientation.x;
// roll = Viper.orientation.y;
// yaw =  Viper.orientation.z;

//console.log(xdirection);

// //set motor threshholds

//larger than 0.6 for start = +
//smaller than 0.6 = - for start