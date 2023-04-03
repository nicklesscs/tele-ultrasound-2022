'use strict';
var ipc = require('node-ipc');
const MotorController = require(__dirname + '/../motors/motorController');

var Polhemus = require(__dirname + '/../server/client')     ///might be this or the one below
const {Viper} = require('./client.js');                     //might need to be a set datapoint

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


// //partition the data into readable chunks

// xdirection = Polhemus.data.x
// ydirection = Polhemus.data.y
// zdirection = Polhemus.data.z
// pitch =
// roll =
// yaw = 

// //set motor threshholds

//larger than 0.6 for start = +
//smaller than 0.6 = - for start